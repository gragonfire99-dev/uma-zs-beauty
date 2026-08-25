import { supabase } from './supabaseClient'
import { mapProductRow } from './catalog'

export async function getSessionUser() {
  if (!supabase) return null
  const { data } = await supabase.auth.getUser()
  return data.user || null
}

export async function getProfile(userId) {
  if (!supabase || !userId) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, role')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function signInAdmin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOutAdmin() {
  if (!supabase) return
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function requestPasswordReset(email) {
  const redirectTo = `${window.location.origin}/admin`
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  })
  if (error) throw error
}

export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  if (error) throw error
}

export async function fetchAdminProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) throw error
  return (data || []).map(mapProductRow)
}

function toProductPayload(form) {
  const stockQuantity = Math.max(0, Number(form.stockQuantity) || 0)

  return {
    name_en: form.nameEn.trim(),
    name_fr: form.nameFr.trim(),
    name_ar: form.nameAr.trim(),
    description_en: form.descriptionEn.trim(),
    description_fr: form.descriptionFr.trim(),
    description_ar: form.descriptionAr.trim(),
    category: form.category,
    subcategory: form.subcategory,
    type: form.type.trim(),
    brand: form.brand.trim(),
    volume: form.volume.trim(),
    price: Number(form.price) || 0,
    old_price: form.oldPrice === '' ? null : Number(form.oldPrice),
    stock_quantity: stockQuantity,
    rating: Number(form.rating) || 0,
    image: form.image.trim(),
  }
}

export async function createProduct(form) {
  const { data, error } = await supabase
    .from('products')
    .insert(toProductPayload(form))
    .select('*')
    .single()

  if (error) throw error
  return mapProductRow(data)
}

export async function updateProduct(id, form) {
  const { data, error } = await supabase
    .from('products')
    .update(toProductPayload(form))
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return mapProductRow(data)
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

export async function updateProductStock(id, stockQuantity) {
  const quantity = Math.max(0, Number(stockQuantity) || 0)
  const { data, error } = await supabase
    .from('products')
    .update({ stock_quantity: quantity })
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return mapProductRow(data)
}

export async function uploadProductImage(file) {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${crypto.randomUUID()}.${extension}`

  const { error } = await supabase.storage
    .from('product-images')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(path)

  return data.publicUrl
}
