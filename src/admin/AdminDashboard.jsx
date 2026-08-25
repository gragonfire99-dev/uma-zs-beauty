import { useState, useEffect } from 'react'
import {
  fetchAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
  uploadProductImage,
  signOutAdmin,
} from '../lib/adminApi'
import { CATEGORIES } from '../categories'
import './Admin.css'

const initialFormState = {
  nameEn: '',
  nameFr: '',
  nameAr: '',
  descriptionEn: '',
  descriptionFr: '',
  descriptionAr: '',
  category: 'Beauty',
  subcategory: 'Face',
  type: '',
  brand: '',
  volume: '',
  price: '',
  oldPrice: '',
  stockQuantity: '0',
  rating: '0',
  image: '',
}

export default function AdminDashboard({ user, profile, onLogout }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState(initialFormState)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [savingStockId, setSavingStockId] = useState(null)
  const [productSearch, setProductSearch] = useState('')

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await fetchAdminProducts()
      setProducts(data)
    } catch (err) {
      console.error('Error loading products:', err)
      setError('تعذر تحميل المنتجات.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminProducts()
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error('Error loading products:', err)
        setError('تعذر تحميل المنتجات.')
      })
      .finally(() => setLoading(false))
  }, [])

  const clearForm = () => {
    setFormData(initialFormState)
    setEditingProduct(null)
    setShowModal(false)
  }

  const handleOpenAdd = () => {
    setFormData(initialFormState)
    setEditingProduct(null)
    setShowModal(true)
  }

  const handleOpenEdit = (product) => {
    setFormData({
      nameEn: product.names?.en || '',
      nameFr: product.names?.fr || '',
      nameAr: product.names?.ar || '',
      descriptionEn: product.descriptions?.en || '',
      descriptionFr: product.descriptions?.fr || '',
      descriptionAr: product.descriptions?.ar || '',
      category: product.category || 'Beauty',
      subcategory: product.subcategory || 'Face',
      type: product.type || '',
      brand: product.brand || '',
      volume: product.volume || '',
      price: String(product.price || ''),
      oldPrice: product.oldPrice ? String(product.oldPrice) : '',
      stockQuantity: String(product.stockQuantity ?? 0),
      rating: String(product.rating || 0),
      image: product.image || '',
    })
    setEditingProduct(product)
    setShowModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (e) => {
    const category = e.target.value
    const subcategories =
      CATEGORIES.find((item) => item.id === category)?.subcategories || []

    setFormData((prev) => ({
      ...prev,
      category,
      subcategory: subcategories[0] || '',
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('يرجى اختيار ملف صورة صالح.')
      return
    }

    try {
      setUploadingImage(true)
      const imageUrl = await uploadProductImage(file)
      setFormData((prev) => ({ ...prev, image: imageUrl }))
    } catch (err) {
      console.error('Image upload error:', err)
      setError('تعذر رفع الصورة.')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (
      !formData.nameEn.trim() ||
      !formData.nameFr.trim() ||
      !formData.nameAr.trim()
    ) {
      setError('يرجى إدخال اسم المنتج بجميع اللغات.')
      return
    }

    if (!formData.price || Number(formData.price) <= 0) {
      setError('يرجى إدخال سعر صالح.')
      return
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData)
        setSuccess('تم تحديث المنتج بنجاح.')
      } else {
        await createProduct(formData)
        setSuccess('تمت إضافة المنتج بنجاح.')
      }
      clearForm()
      loadProducts()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Save error:', err)
      setError('تعذر حفظ المنتج.')
    }
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) return

    try {
      await deleteProduct(productId)
      setSuccess('تم حذف المنتج بنجاح.')
      loadProducts()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Delete error:', err)
      setError('تعذر حذف المنتج.')
    }
  }

  const handleQuickStock = async (product, nextQuantity) => {
    const quantity = Math.max(0, Number(nextQuantity) || 0)

    if (quantity === product.stockQuantity) return

    try {
      setSavingStockId(product.id)
      const updated = await updateProductStock(product.id, quantity)
      setProducts((current) =>
        current.map((item) => (item.id === updated.id ? updated : item))
      )
      setSuccess(`تم تحديث مخزون "${updated.names.en}".`)
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Stock update error:', err)
      setError('تعذر تحديث المخزون.')
    } finally {
      setSavingStockId(null)
    }
  }

  const handleLogout = async () => {
    try {
      await signOutAdmin()
    } catch (err) {
      console.error('Logout error:', err)
    }
    onLogout()
  }

  const getStockStatus = (quantity) => {
    if (quantity <= 0) return { text: 'غير متوفر', class: 'admin-stock-out' }
    if (quantity < 10) return { text: 'مخزون منخفض', class: 'admin-stock-low' }
    return { text: 'متوفر', class: 'admin-stock-in' }
  }

  const totalProducts = products.length
  const inStockProducts = products.filter((p) => p.stockQuantity > 0).length
  const outOfStockProducts = products.filter((p) => p.stockQuantity <= 0).length
  const totalValue = products.reduce(
    (sum, p) => sum + p.price * p.stockQuantity,
    0
  )

  const normalizedSearch = productSearch.trim().toLocaleLowerCase()
  const filteredProducts = normalizedSearch
    ? products.filter((product) =>
        [
          product.names?.en,
          product.names?.fr,
          product.names?.ar,
        ]
          .filter(Boolean)
          .some((name) =>
            name.toLocaleLowerCase().includes(normalizedSearch)
          )
      )
    : products

  const selectedSubcategories =
    CATEGORIES.find((item) => item.id === formData.category)?.subcategories ||
    []

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="admin-header-left">
          <span className="admin-logo">UMA Z&S — لوحة الإدارة</span>
        </div>

        <div className="admin-user-info">
          <span>{profile?.email || user?.email}</span>

          <a href="/" className="admin-btn admin-btn-secondary admin-btn-sm">
            عرض المتجر
          </a>

          <button
            type="button"
            className="admin-btn admin-btn-danger admin-btn-sm"
            onClick={handleLogout}
          >
            تسجيل الخروج
          </button>
        </div>
      </header>

      <main className="admin-content">
        {error && <div className="admin-error">{error}</div>}
        {success && <div className="admin-success">{success}</div>}

        <h1 className="admin-section-title">إدارة المنتجات</h1>

        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-value">{totalProducts}</div>
            <div className="admin-stat-label">إجمالي المنتجات</div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-value">{inStockProducts}</div>
            <div className="admin-stat-label">منتجات متوفرة</div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-value">{outOfStockProducts}</div>
            <div className="admin-stat-label">منتجات غير متوفرة</div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-value">{totalValue.toFixed(2)} DH</div>
            <div className="admin-stat-label">قيمة المخزون</div>
          </div>
        </div>

        <div className="admin-table-container">
          <div className="admin-table-header">
            <h2 className="admin-table-title">قائمة المنتجات</h2>

            <div className="admin-product-search">
              <label htmlFor="admin-product-search">بحث عن منتج</label>
              <input
                id="admin-product-search"
                type="text"
                dir="auto"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="البحث عن منتج..."
              />
            </div>

            <button
              type="button"
              className="admin-btn admin-btn-primary"
              onClick={handleOpenAdd}
            >
              + إضافة منتج
            </button>
          </div>

          {loading ? (
            <div className="admin-loading">
              <div className="admin-spinner"></div>
              جاري تحميل المنتجات...
            </div>
          ) : products.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-icon">📦</div>
              <p>لا توجد منتجات بعد. ابدأ بإضافة أول منتج.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="admin-empty">
              <p>لا توجد منتجات مطابقة لبحثك.</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>الصورة</th>
                    <th>المنتج</th>
                    <th>الفئة</th>
                    <th>السعر</th>
                    <th>المخزون</th>
                    <th>الحالة</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stockQuantity)

                    return (
                      <tr key={product.id}>
                        <td>
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.names.en}
                              className="admin-product-image"
                            />
                          ) : (
                            <div className="admin-product-image"></div>
                          )}
                        </td>

                        <td>
                          <div className="admin-product-name">
                            {product.names.en}
                          </div>
                          <div className="admin-product-category" dir="rtl">
                            {product.names.ar}
                          </div>
                          <div className="admin-product-category">
                            {product.brand}
                          </div>
                        </td>

                        <td>
                          <div className="admin-product-name">
                            {product.category}
                          </div>
                          <div className="admin-product-category">
                            {product.subcategory}
                          </div>
                        </td>

                        <td>
                          <span className="admin-price">{product.price} DH</span>
                          {product.oldPrice > product.price && (
                            <span className="admin-old-price">
                              {product.oldPrice} DH
                            </span>
                          )}
                        </td>

                        <td>
                          <div className="admin-stock-controls">
                            <button
                              type="button"
                              disabled={savingStockId === product.id}
                              onClick={() =>
                                handleQuickStock(
                                  product,
                                  product.stockQuantity - 1
                                )
                              }
                              aria-label="إنقاص الكمية"
                            >
                              −
                            </button>

                            <input
                              type="number"
                              min="0"
                              defaultValue={product.stockQuantity}
                              key={`${product.id}-${product.stockQuantity}`}
                              onBlur={(e) =>
                                handleQuickStock(product, e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleQuickStock(product, e.target.value)
                                  e.target.blur()
                                }
                              }}
                              aria-label="كمية المخزون"
                            />

                            <button
                              type="button"
                              disabled={savingStockId === product.id}
                              onClick={() =>
                                handleQuickStock(
                                  product,
                                  product.stockQuantity + 1
                                )
                              }
                              aria-label="زيادة الكمية"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`admin-stock-badge ${stockStatus.class}`}
                          >
                            {stockStatus.text}
                          </span>
                        </td>

                        <td>
                          <div className="admin-actions">
                            <button
                              type="button"
                              className="admin-btn admin-btn-secondary admin-btn-sm"
                              onClick={() => handleOpenEdit(product)}
                            >
                              تعديل
                            </button>

                            <button
                              type="button"
                              className="admin-btn admin-btn-danger admin-btn-sm"
                              onClick={() => handleDelete(product.id)}
                            >
                              حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <div
          className="admin-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) clearForm()
          }}
        >
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
              </h3>

              <button
                type="button"
                className="admin-modal-close"
                onClick={clearForm}
                aria-label="إغلاق"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor="nameEn">الاسم (EN)</label>
                    <input
                      id="nameEn"
                      name="nameEn"
                      type="text"
                      value={formData.nameEn}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="nameFr">الاسم (FR)</label>
                    <input
                      id="nameFr"
                      name="nameFr"
                      type="text"
                      value={formData.nameFr}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="nameAr">الاسم (AR)</label>
                  <input
                    id="nameAr"
                    name="nameAr"
                    type="text"
                    dir="rtl"
                    value={formData.nameAr}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="descriptionEn">الوصف (EN)</label>
                  <textarea
                    id="descriptionEn"
                    name="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="descriptionFr">الوصف (FR)</label>
                  <textarea
                    id="descriptionFr"
                    name="descriptionFr"
                    value={formData.descriptionFr}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="descriptionAr">الوصف (AR)</label>
                  <textarea
                    id="descriptionAr"
                    name="descriptionAr"
                    dir="rtl"
                    value={formData.descriptionAr}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor="category">الفئة الرئيسية</label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                    >
                      {CATEGORIES.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.id}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="subcategory">الفئة الفرعية</label>
                    <select
                      id="subcategory"
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleInputChange}
                    >
                      {selectedSubcategories.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor="type">النوع</label>
                    <input
                      id="type"
                      name="type"
                      type="text"
                      value={formData.type}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="brand">العلامة التجارية</label>
                    <input
                      id="brand"
                      name="brand"
                      type="text"
                      value={formData.brand}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor="volume">الحجم / الكمية</label>
                    <input
                      id="volume"
                      name="volume"
                      type="text"
                      value={formData.volume}
                      onChange={handleInputChange}
                      placeholder="مثال: 250 ml"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="rating">التقييم (0-5)</label>
                    <input
                      id="rating"
                      name="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor="price">السعر (DH)</label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="oldPrice">السعر قبل الخصم (اختياري)</label>
                    <input
                      id="oldPrice"
                      name="oldPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.oldPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="stockQuantity">الكمية في المخزون</label>
                  <input
                    id="stockQuantity"
                    name="stockQuantity"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                  />
                  <small className="admin-field-hint">
                    عندما تكون الكمية 0 يظهر المنتج كـ "غير متوفر" في المتجر.
                  </small>
                </div>

                <div className="admin-form-group">
                  <label>صورة المنتج</label>

                  <label className="admin-image-upload">
                    <div className="admin-image-upload-icon">🖼️</div>

                    <div className="admin-image-upload-text">
                      {uploadingImage
                        ? 'جاري رفع الصورة...'
                        : 'اضغط لاختيار صورة أو أسقطها هنا'}
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                  </label>

                  <div className="admin-form-group">
                    <label htmlFor="imageUrl">أو ضع رابط صورة</label>
                    <input
                      id="imageUrl"
                      name="image"
                      type="url"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://..."
                    />
                  </div>

                  {formData.image && (
                    <div className="admin-image-preview">
                      <img src={formData.image} alt="معاينة المنتج" />
                    </div>
                  )}
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={clearForm}
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={uploadingImage}
                >
                  {editingProduct ? 'حفظ التعديلات' : 'إضافة المنتج'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
