-- Uma Z&S Beauty — database, auth roles, and security
-- Run this entire file in Supabase: SQL Editor → New query → Run

create extension if not exists "pgcrypto";

-- ================= PROFILES =================

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'customer')
  on conflict (id) do update
    set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- ================= ADMIN CHECK =================

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- ================= PRODUCTS =================

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  translation_key text,
  name_en text not null,
  name_fr text not null,
  name_ar text not null,
  description_en text not null default '',
  description_fr text not null default '',
  description_ar text not null default '',
  category text not null,
  subcategory text not null,
  type text not null default '',
  brand text not null default '',
  volume text not null default '',
  price numeric(12, 2) not null,
  old_price numeric(12, 2),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  rating numeric(3, 2) not null default 0,
  image text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;

create trigger products_set_updated_at
before update on public.products
for each row execute procedure public.set_updated_at();

-- ================= ROW LEVEL SECURITY =================

alter table public.profiles enable row level security;
alter table public.products enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
on public.products
for select
to anon, authenticated
using (true);

drop policy if exists "products_admin_insert" on public.products;
create policy "products_admin_insert"
on public.products
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "products_admin_update" on public.products;
create policy "products_admin_update"
on public.products
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "products_admin_delete" on public.products;
create policy "products_admin_delete"
on public.products
for delete
to authenticated
using (public.is_admin());

-- Customers cannot change their own role from the client.
drop policy if exists "profiles_no_client_write" on public.profiles;

-- ================= STORAGE =================

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product_images_public_read" on storage.objects;
create policy "product_images_public_read"
on storage.objects
for select
to public
using (bucket_id = 'product-images');

drop policy if exists "product_images_admin_insert" on storage.objects;
create policy "product_images_admin_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'product-images'
  and public.is_admin()
);

drop policy if exists "product_images_admin_update" on storage.objects;
create policy "product_images_admin_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'product-images'
  and public.is_admin()
)
with check (
  bucket_id = 'product-images'
  and public.is_admin()
);

drop policy if exists "product_images_admin_delete" on storage.objects;
create policy "product_images_admin_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'product-images'
  and public.is_admin()
);

-- ================= REALTIME =================

alter table public.products replica identity full;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'products'
  ) then
    execute 'alter publication supabase_realtime add table public.products';
  end if;
end;
$$;

-- ================= SEED CURRENT PRODUCT =================

insert into public.products (
  id,
  translation_key,
  name_en,
  name_fr,
  name_ar,
  description_en,
  description_fr,
  description_ar,
  category,
  subcategory,
  type,
  brand,
  volume,
  price,
  old_price,
  stock_quantity,
  rating,
  image,
  sort_order
)
values (
  '11111111-1111-1111-1111-111111111111',
  'facialCleanser',
  'Gel Limpiador Facial Clean',
  'Gel Nettoyant Visage Clean',
  'جل منظف للوجه Clean',
  'Daily facial cleansing gel that gently cleans the skin and removes impurities and excess oil without drying it. Suitable for normal and combination skin.',
  'Gel nettoyant quotidien pour le visage qui nettoie délicatement la peau et élimine les impuretés et l''excès de sébum sans la dessécher. Convient aux peaux normales et mixtes.',
  'جل منظف يومي للوجه ينظف البشرة بلطف ويزيل الشوائب والإفرازات الدهنية دون أن يسبب جفافها. مناسب للبشرة العادية والمختلطة.',
  'Beauty',
  'Face',
  'Facial Cleanser',
  'Deliplus',
  '250 ml',
  40,
  50,
  10,
  4.2,
  '/facial-cleanser.jpg',
  1
)
on conflict (id) do nothing;
