-- =====================================================================
-- ترقية حساب المدير إلى صلاحية admin
-- =====================================================================
-- الطريقة:
--   1) أنشئ المستخدم أولاً من لوحة Supabase:
--      Dashboard → Authentication → Users → Add user
--      (أدخل البريد وكلمة المرور، وفعّل Auto Confirm User)
--
--   2) عدّل البريد في السطر التالي ثم شغّل هذا الملف كاملًا في:
--      Dashboard → SQL Editor → New query → Run
-- =====================================================================

insert into public.profiles (id, email, role)
select *
from (
  select u.id, u.email, 'admin'::text as role
  from auth.users u
  where u.email = 'admin@example.com'  -- ← ضع بريد المدير هنا
  limit 1
) src
on conflict (id) do update
  set role = 'admin',
      email = excluded.email;

-- =====================================================================
-- تحقق: يجب أن يظهر صف واحد بالبريد ودوره admin
-- إذا لم يظهر شيء فالمستخدم غير موجود — أنشئه أولاً من الخطوة 1
-- =====================================================================

select id, email, role
from public.profiles
where role = 'admin';
