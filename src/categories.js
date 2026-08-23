// ملف التصنيفات المركزي.
// لإضافة قسم: أضف عنصراً جديداً في القائمة.
// لحذف قسم كامل (مثل Makeup): احذف ذلك العنصر من هنا فقط.
// المنتج يحدد category و subcategory بنفس الأسماء المكتوبة أدناه.

export const CATEGORIES = [
  {
    id: 'Beauty',
    image: '/beauty.jpg',
    subcategories: ['Face', 'Hair', 'Hands', 'Body', 'Nails', 'Other'],
  },
  {
    id: 'Makeup',
    image: '/makeup.jpg',
    subcategories: ['Eyes', 'Lips', 'Cheeks', 'Face', 'Other'],
  },
  {
    id: 'Accessories',
    image: '/accessories.jpg',
    subcategories: ['Hands', 'Ears', 'Neck', 'Hair', 'Other'],
  },
  {
    id: 'Perfumes',
    image: '/perfumes.jpg',
    subcategories: ['Women', 'Men', 'Unisex', 'Other'],
  },
]

export const getCategoryById = (categoryId) =>
  CATEGORIES.find((item) => item.id === categoryId)
