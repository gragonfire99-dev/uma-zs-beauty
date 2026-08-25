import { supabase, isSupabaseConfigured } from './supabaseClient'
import translations from '../translations'

export const FALLBACK_PRODUCTS = [
  {
    id: 1,
    translationKey: 'facialCleanser',
    names: {
      en: 'Gel Limpiador Facial Clean',
      fr: 'Gel Nettoyant Visage Clean',
      ar: 'جل منظف للوجه Clean',
    },
    descriptions: {
      en: 'Daily facial cleansing gel that gently cleans the skin and removes impurities and excess oil without drying it. Suitable for normal and combination skin.',
      fr: 'Gel nettoyant quotidien pour le visage qui nettoie délicatement la peau et élimine les impuretés et l’excès de sébum sans la dessécher. Convient aux peaux normales et mixtes.',
      ar: 'جل منظف يومي للوجه ينظف البشرة بلطف ويزيل الشوائب والإفرازات الدهنية دون أن يسبب جفافها. مناسب للبشرة العادية والمختلطة.',
    },
    category: 'Beauty',
    subcategory: 'Face',
    type: 'Facial Cleanser',
    price: 40,
    oldPrice: 50,
    stockQuantity: 10,
    stock: true,
    rating: 4.2,
    volume: '250 ml',
    brand: 'Deliplus',
    description:
      'Gel limpiador facial diario que limpia suavemente la piel y elimina las impurezas y el exceso de grasa sin resecarla. Adecuado para piel normal y mixta.',
    image: '/facial-cleanser.jpg',
  },
]

export function getProductTranslation(product, language = 'en') {
  const fallback =
    translations[language]?.products?.[product.translationKey] || {}

  return {
    name:
      product.names?.[language] ||
      product.names?.en ||
      fallback.name ||
      product.brand ||
      product.translationKey,
    description:
      product.descriptions?.[language] ||
      product.descriptions?.en ||
      fallback.description ||
      product.description ||
      '',
    category:
      translations[language]?.shop?.subcategoryNames?.[
        product.subcategory
      ] ||
      fallback.category ||
      product.subcategory,
    volume: product.volume || fallback.volume || '',
  }
}

export function mapProductRow(row) {
  const stockQuantity = Number(row.stock_quantity) || 0

  return {
    id: row.id,
    translationKey: row.translation_key || null,
    names: {
      en: row.name_en || '',
      fr: row.name_fr || '',
      ar: row.name_ar || '',
    },
    descriptions: {
      en: row.description_en || '',
      fr: row.description_fr || '',
      ar: row.description_ar || '',
    },
    category: row.category,
    subcategory: row.subcategory,
    type: row.type || '',
    brand: row.brand || '',
    volume: row.volume || '',
    price: Number(row.price) || 0,
    oldPrice: row.old_price != null ? Number(row.old_price) : 0,
    stockQuantity,
    stock: stockQuantity > 0,
    rating: Number(row.rating) || 0,
    image: row.image || '',
    description: row.description_en || '',
  }
}

export async function fetchStoreProducts() {
  if (!isSupabaseConfigured || !supabase) {
    return FALLBACK_PRODUCTS
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) {
    throw error
  }

  return (data || []).map(mapProductRow)
}

export function subscribeToProducts(onChange) {
  if (!isSupabaseConfigured || !supabase) {
    return () => {}
  }

  const channel = supabase
    .channel('store-products')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'products',
      },
      () => {
        onChange()
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
