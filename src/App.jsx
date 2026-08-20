import { useState } from 'react'
import translations from './translations'

const products = [
  {
    id: 1,
    translationKey: 'facialCleanser',
    category: 'Beauty',
    subcategory: 'Face Care',
    type: 'Facial Cleanser',
    price: 40,
    oldPrice: 50,
    stock: true,
    rating: 4.2,
    volume: '250 ml',
    brand: 'Deliplus',
    description:
      'Gel limpiador facial diario que limpia suavemente la piel y elimina las impurezas y el exceso de grasa sin resecarla. Adecuado para piel normal y mixta.',
    image: '/facial-cleanser.jpg',
  },
]

const interfaceText = {
  en: {
    searchPlaceholder: 'Search products...',
    sort: 'Sort by',
    defaultSort: 'Featured',
    priceLow: 'Price: Low to High',
    priceHigh: 'Price: High to Low',
    ratingHigh: 'Rating: High to Low',
    available: 'Available',
    outOfStock: 'Out of stock',
    addToCart: 'Add to Cart',
    addedToCart: 'Added to Cart',
    brand: 'Brand',
    volume: 'Volume',
    noResults: 'No products found',
    noResultsDescription:
      'Try another search or choose a different category.',
    discount: 'OFF',
    cart: 'Cart',
    cartEmpty: 'Your cart is empty',
    cartDescription:
      'Add products to your cart and they will appear here.',
    remove: 'Remove',
    total: 'Total',

    viewProduct: 'View Product',
    productDetails: 'Product Details',
    quantity: 'Quantity',
    customerReviews: 'Customer Reviews',
    noReviews: 'No reviews yet.',
    writeReview: 'Reviews will appear here after customers purchase this product.',
    continueShopping: 'Continue Shopping',
    buyNow: 'Buy Now',
    checkout: 'Complete Order',
    checkoutDescription:
      'Your order will be prepared and the final confirmation will be completed through WhatsApp.',
    customerSpace: 'Customer Area',
    trackOrder: 'Track Your Order',
    fullName: 'Full Name',
    phone: 'Phone Number',
    trackingNumber: 'Tracking Number',
    enterTracking: 'Enter your tracking number',
    track: 'Track Order',
    orderNotFound: 'Order not found',
    orderNotFoundDescription:
      'Please check your tracking number and try again.',
    orderStatus: 'Order Status',
    orderDetails: 'Order Details',
    orderDate: 'Order Date',
    statusProcessing: 'Processing',
    statusPrepared: 'Prepared',
    statusShipped: 'Shipped',
    statusInTransit: 'In Transit',
    statusDelivered: 'Delivered',
    statusCancelled: 'Cancelled',
    cancellationReason: 'Cancellation Reason',
    customerAccountDescription:
      'Enter your information and tracking number to view your order.',
    customerInfo: 'Customer Information',
    close: 'Close',
    decrease: 'Decrease quantity',
    increase: 'Increase quantity',
    subtotal: 'Subtotal',
  },

  fr: {
    searchPlaceholder: 'Rechercher des produits...',
    sort: 'Trier par',
    defaultSort: 'En vedette',
    priceLow: 'Prix : du moins cher au plus cher',
    priceHigh: 'Prix : du plus cher au moins cher',
    ratingHigh: 'Note : de la plus élevée à la plus basse',
    available: 'Disponible',
    outOfStock: 'Rupture de stock',
    addToCart: 'Ajouter au panier',
    addedToCart: 'Ajouté au panier',
    brand: 'Marque',
    volume: 'Contenance',
    noResults: 'Aucun produit trouvé',
    noResultsDescription:
      'Essayez une autre recherche ou choisissez une autre catégorie.',
    discount: 'DE RÉDUCTION',
    cart: 'Panier',
    cartEmpty: 'Votre panier est vide',
    cartDescription:
      'Ajoutez des produits à votre panier et ils apparaîtront ici.',
    remove: 'Supprimer',
    total: 'Total',

    viewProduct: 'Voir le produit',
    productDetails: 'Détails du produit',
    quantity: 'Quantité',
    customerReviews: 'Avis clients',
    noReviews: 'Aucun avis pour le moment.',
    writeReview:
      'Les avis apparaîtront ici après les achats des clients.',
    continueShopping: 'Continuer mes achats',
    buyNow: 'Acheter maintenant',
    checkout: 'Finaliser la commande',
    checkoutDescription:
      'Votre commande sera préparée et la confirmation finale sera effectuée via WhatsApp.',
    customerSpace: 'Espace client',
    trackOrder: 'Suivre votre commande',
    fullName: 'Nom complet',
    phone: 'Numéro de téléphone',
    trackingNumber: 'Numéro de suivi',
    enterTracking: 'Entrez votre numéro de suivi',
    track: 'Suivre la commande',
    orderNotFound: 'Commande introuvable',
    orderNotFoundDescription:
      'Vérifiez votre numéro de suivi et réessayez.',
    orderStatus: 'État de la commande',
    orderDetails: 'Détails de la commande',
    orderDate: 'Date de commande',
    statusProcessing: 'En traitement',
    statusPrepared: 'Préparée',
    statusShipped: 'Expédiée',
    statusInTransit: 'En cours de livraison',
    statusDelivered: 'Livrée',
    statusCancelled: 'Annulée',
    cancellationReason: "Raison de l'annulation",
    customerAccountDescription:
      'Entrez vos informations et votre numéro de suivi pour consulter votre commande.',
    customerInfo: 'Informations client',
    close: 'Fermer',
    decrease: 'Diminuer la quantité',
    increase: 'Augmenter la quantité',
    subtotal: 'Sous-total',
  },

  ar: {
    searchPlaceholder: 'ابحث عن المنتجات...',
    sort: 'ترتيب حسب',
    defaultSort: 'مميز',
    priceLow: 'السعر: من الأرخص إلى الأغلى',
    priceHigh: 'السعر: من الأغلى إلى الأرخص',
    ratingHigh: 'التقييم: من الأعلى إلى الأقل',
    available: 'متوفر',
    outOfStock: 'غير متوفر',
    addToCart: 'أضف إلى السلة',
    addedToCart: 'تمت الإضافة إلى السلة',
    brand: 'العلامة التجارية',
    volume: 'الحجم',
    noResults: 'لم يتم العثور على منتجات',
    noResultsDescription:
      'جرّب بحثًا آخر أو اختر تصنيفًا مختلفًا.',
    discount: 'خصم',
    cart: 'السلة',
    cartEmpty: 'سلتك فارغة',
    cartDescription:
      'أضف المنتجات إلى سلتك وستظهر هنا.',
    remove: 'حذف',
    total: 'المجموع',

    viewProduct: 'معاينة المنتج',
    productDetails: 'تفاصيل المنتج',
    quantity: 'الكمية',
    customerReviews: 'تعليقات الزبائن',
    noReviews: 'لا توجد تعليقات بعد.',
    writeReview:
      'ستظهر تعليقات الزبائن هنا بعد شراء المنتج.',
    continueShopping: 'مواصلة التسوق',
    buyNow: 'اشترِ الآن',
    checkout: 'إتمام الطلب',
    checkoutDescription:
      'سيتم تجهيز طلبك، ثم يتم تأكيد الطلب النهائي عبر واتساب.',
    customerSpace: 'فضاء الزبون',
    trackOrder: 'تتبع طلبك',
    fullName: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    trackingNumber: 'رقم التتبع',
    enterTracking: 'أدخل رقم التتبع الخاص بك',
    track: 'تتبع الطلب',
    orderNotFound: 'لم يتم العثور على الطلب',
    orderNotFoundDescription:
      'تحقق من رقم التتبع وحاول مرة أخرى.',
    orderStatus: 'حالة الطلب',
    orderDetails: 'تفاصيل الطلب',
    orderDate: 'تاريخ الطلب',
    statusProcessing: 'قيد المعالجة',
    statusPrepared: 'تم تجهيز الطلب',
    statusShipped: 'تم الشحن',
    statusInTransit: 'في الطريق إليك',
    statusDelivered: 'تم التسليم',
    statusCancelled: 'تم إلغاء الطلب',
    cancellationReason: 'سبب الإلغاء',
    customerAccountDescription:
      'أدخل معلوماتك ورقم التتبع لعرض تفاصيل طلبك.',
    customerInfo: 'معلومات الزبون',
    close: 'إغلاق',
    decrease: 'تقليل الكمية',
    increase: 'زيادة الكمية',
    subtotal: 'المجموع الفرعي',
  },
}

function App() {
  const [category, setCategory] = useState('All')
  const [cartOpen, setCartOpen] = useState(false)
  const [language, setLanguage] = useState('en')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [cartItems, setCartItems] = useState([])

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const [customerSpaceOpen, setCustomerSpaceOpen] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [trackedOrder, setTrackedOrder] = useState(null)

  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const t = translations[language]
  const ui = interfaceText[language]

  /*
    Demo order structure.

    This is intentionally empty for customers.
    Later, these orders should come from your database.
  */
  const orders = []

  const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existing = currentItems.find(
        (item) => item.id === product.id
      )

      if (existing) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        )
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity,
        },
      ]
    })

    setSelectedProduct(null)
  }

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    )
  }

  const updateCartQuantity = (productId, amount) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.id !== productId) {
            return item
          }

          const newQuantity =
            item.quantity + amount

          return {
            ...item,
            quantity: Math.max(1, newQuantity),
          }
        })
    )
  }

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        category === 'All' ||
        product.category === category

      const productTranslation =
        t.products?.[product.translationKey]

      const searchText =
        search.toLowerCase().trim()

      if (!searchText) {
        return matchesCategory
      }

      const searchableText = [
        productTranslation?.name || '',
        productTranslation?.description || '',
        productTranslation?.category || '',
        product.brand,
        product.subcategory,
        product.type,
      ]
        .join(' ')
        .toLowerCase()

      return (
        matchesCategory &&
        searchableText.includes(searchText)
      )
    })
    .sort((a, b) => {
      if (sortBy === 'priceLow') {
        return a.price - b.price
      }

      if (sortBy === 'priceHigh') {
        return b.price - a.price
      }

      if (sortBy === 'ratingHigh') {
        return b.rating - a.rating
      }

      return 0
    })

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  const scrollToShop = () => {
    document
      .getElementById('shop')
      ?.scrollIntoView({
        behavior: 'smooth',
      })
  }

  const openProduct = (product) => {
    /*
      Save the current scroll position so that closing
      the product page returns the customer to exactly
      where they were.
    */
    sessionStorage.setItem(
      'productScrollPosition',
      window.scrollY.toString()
    )

    setSelectedProduct(product)
    setSelectedQuantity(1)
  }

  const closeProduct = () => {
    setSelectedProduct(null)

    const savedPosition = sessionStorage.getItem(
      'productScrollPosition'
    )

    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo({
          top: Number(savedPosition),
          behavior: 'instant',
        })
      }, 0)
    }
  }

  const openCustomerSpace = () => {
    setCustomerSpaceOpen(true)
    setTrackedOrder(null)
  }

  const trackCustomerOrder = () => {
    const normalizedTracking =
      trackingNumber.trim().toUpperCase()

    const foundOrder = orders.find(
      (order) =>
        order.trackingNumber ===
        normalizedTracking
    )

    setTrackedOrder(foundOrder || 'not-found')
  }

  const getStatusClass = (status) => {
    if (status === 'cancelled') {
      return 'cancelled'
    }

    if (status === 'delivered') {
      return 'delivered'
    }

    if (status === 'in-transit') {
      return 'in-transit'
    }

    return 'processing'
  }

  return (
    <div
      className="store"
      dir={
        language === 'ar'
          ? 'rtl'
          : 'ltr'
      }
    >

      {/* ================= HEADER ================= */}

      <header className="header">

        <div className="logo">
          <h1>Uma Z&S Beauty</h1>
        </div>

        <nav className="nav">
          <a href="#home">
            {t.nav.home}
          </a>

          <a href="#collections">
            {t.nav.collections}
          </a>

          <a href="#shop">
            {t.nav.shop}
          </a>

          <a href="#about">
            {t.nav.about}
          </a>

          <a href="#contact">
            {t.nav.contact}
          </a>
        </nav>

        <div className="header-actions">

          <button
            className="customer-button"
            onClick={openCustomerSpace}
          >
            👤 {ui.customerSpace}
          </button>

          <button
            className="cart-button"
            onClick={() =>
              setCartOpen(true)
            }
          >
            🛒 {ui.cart}

            {cartItems.length > 0 && (
              <span className="cart-count">
                {cartItems.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}
              </span>
            )}
          </button>

          <div className="language-switcher">

            <button
              onClick={() =>
                setLanguage('en')
              }
            >
              EN
            </button>

            <button
              onClick={() =>
                setLanguage('fr')
              }
            >
              FR
            </button>

            <button
              onClick={() =>
                setLanguage('ar')
              }
            >
              AR
            </button>

          </div>

        </div>

      </header>

      {/* ================= MAIN ================= */}

      <main>

        {/* ================= HERO ================= */}

        <section
          className="hero"
          id="home"
          style={{
            backgroundImage:
              "url('/hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition:
              'center',
            backgroundRepeat:
              'no-repeat',
          }}
        >

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <p className="hero-small-title">
              {t.hero.welcome}
            </p>

            <h2>
              {t.hero.title}
              <span>
                {t.hero.beauty}
              </span>
            </h2>

            <p className="hero-description">
              {t.hero.description}
            </p>

            <a
              href="#collections"
              className="shop-button"
            >
              {t.hero.shopNow}
            </a>

          </div>

          <div className="floating-card card-one">
            ✨ {t.hero.beautyCard}
          </div>

          <div className="floating-card card-two">
            💗 {t.hero.eleganceCard}
          </div>

        </section>

        {/* ================= COLLECTIONS ================= */}

        <section
          className="collections"
          id="collections"
        >

          <p className="section-subtitle">
            {t.collections.subtitle}
          </p>

          <h2>
            {t.collections.title}
          </h2>

          <div className="collection-grid">

            <div className="collection-card">

              <div className="collection-image">
                <img
                  src="/makeup.jpg"
                  alt="Makeup"
                />
              </div>

              <h3>
                {t.collections.makeup.title}
              </h3>

              <p>
                {t.collections.makeup.description}
              </p>

              <button
                onClick={() => {
                  setCategory('Makeup')
                  scrollToShop()
                }}
              >
                {t.collections.makeup.button}
              </button>

            </div>

            <div className="collection-card">

              <div className="collection-image">
                <img
                  src="/accessories.jpg"
                  alt="Accessories"
                />
              </div>

              <h3>
                {t.collections.accessories.title}
              </h3>

              <p>
                {t.collections.accessories.description}
              </p>

              <button
                onClick={() => {
                  setCategory('Accessories')
                  scrollToShop()
                }}
              >
                {t.collections.accessories.button}
              </button>

            </div>

            <div className="collection-card">

              <div className="collection-image">
                <img
                  src="/perfumes.jpg"
                  alt="Perfumes"
                />
              </div>

              <h3>
                {t.collections.perfumes.title}
              </h3>

              <p>
                {t.collections.perfumes.description}
              </p>

              <button
                onClick={() => {
                  setCategory('Perfumes')
                  scrollToShop()
                }}
              >
                {t.collections.perfumes.button}
              </button>

            </div>

            <div className="collection-card">

              <div className="collection-image">
                <img
                  src="/beauty.jpg"
                  alt="Beauty"
                />
              </div>

              <h3>
                {t.collections.beauty.title}
              </h3>

              <p>
                {t.collections.beauty.description}
              </p>

              <button
                onClick={() => {
                  setCategory('Beauty')
                  scrollToShop()
                }}
              >
                {t.collections.beauty.button}
              </button>

            </div>

          </div>

        </section>

        {/* ================= SHOP ================= */}

        <section
          className="shop"
          id="shop"
        >

          <p className="section-subtitle">
            {t.shop.subtitle}
          </p>

          <h2>
            {t.shop.title}
          </h2>

          <p className="shop-intro">
            {t.shop.intro}
          </p>

          <div className="shop-tools">

            <div className="search-box">

              <span className="search-icon">
                🔎
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder={
                  ui.searchPlaceholder
                }
              />

              {search && (
                <button
                  className="search-clear"
                  onClick={() =>
                    setSearch('')
                  }
                >
                  ×
                </button>
              )}

            </div>

            <div className="sort-box">

              <label htmlFor="sort-products">
                {ui.sort}
              </label>

              <select
                id="sort-products"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value
                  )
                }
              >
                <option value="default">
                  {ui.defaultSort}
                </option>

                <option value="priceLow">
                  {ui.priceLow}
                </option>

                <option value="priceHigh">
                  {ui.priceHigh}
                </option>

                <option value="ratingHigh">
                  {ui.ratingHigh}
                </option>
              </select>

            </div>

          </div>

          <div className="shop-filters">

            <button
              className={
                category === 'All'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setCategory('All')
              }
            >
              {t.shop.filters.all}
            </button>

            <button
              className={
                category === 'Makeup'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setCategory('Makeup')
              }
            >
              {t.shop.filters.makeup}
            </button>

            <button
              className={
                category === 'Perfumes'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setCategory('Perfumes')
              }
            >
              {t.shop.filters.perfumes}
            </button>

            <button
              className={
                category === 'Accessories'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setCategory(
                  'Accessories'
                )
              }
            >
              {t.shop.filters.accessories}
            </button>

            <button
              className={
                category === 'Beauty'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setCategory('Beauty')
              }
            >
              {t.shop.filters.beauty}
            </button>

          </div>

          {filteredProducts.length > 0 ? (

            <div className="product-grid">

              {filteredProducts.map(
                (product) => {

                  const productTranslation =
                    t.products?.[
                      product.translationKey
                    ]

                  const discount =
                    product.oldPrice >
                    product.price
                      ? Math.round(
                          ((product.oldPrice -
                            product.price) /
                            product.oldPrice) *
                            100
                        )
                      : 0

                  return (
                    <div
                      className="product-card"
                      key={product.id}
                    >

                      <button
                        className="product-click-area"
                        onClick={() =>
                          openProduct(product)
                        }
                        aria-label={
                          ui.viewProduct
                        }
                      >

                        <div className="product-image">

                          {discount > 0 && (
                            <span className="discount-badge">
                              {discount}%{' '}
                              {ui.discount}
                            </span>
                          )}

                          <img
                            src={
                              product.image
                            }
                            alt={
                              productTranslation?.name ||
                              product.brand
                            }
                          />

                        </div>

                        <div className="product-info">

                          <p className="product-category">
                            {productTranslation?.category ||
                              product.subcategory}
                          </p>

                          <h3>
                            {productTranslation?.name ||
                              product.translationKey}
                          </h3>

                          <p className="product-description">
                            {productTranslation?.description ||
                              product.description}
                          </p>

                          <div className="product-details">

                            <span>
                              <strong>
                                {ui.brand}:
                              </strong>{' '}
                              {product.brand}
                            </span>

                            <span>
                              <strong>
                                {ui.volume}:
                              </strong>{' '}
                              {productTranslation?.volume ||
                                product.volume}
                            </span>

                          </div>

                          <div className="product-rating">
                            ⭐ {product.rating}
                          </div>

                          <div className="product-price">

                            {product.oldPrice >
                              product.price && (
                              <span className="old-price">
                                {product.oldPrice}{' '}
                                DH
                              </span>
                            )}

                            <span className="current-price">
                              {product.price} DH
                            </span>

                          </div>

                        </div>

                      </button>

                      <div className="product-card-bottom">

                        <p
                          className={
                            product.stock
                              ? 'product-stock available'
                              : 'product-stock unavailable'
                          }
                        >
                          {product.stock
                            ? ui.available
                            : ui.outOfStock}
                        </p>

                        <button
                          className="product-button"
                          disabled={
                            !product.stock
                          }
                          onClick={() =>
                            openProduct(product)
                          }
                        >
                          {product.stock
                            ? ui.viewProduct
                            : ui.outOfStock}
                        </button>

                      </div>

                    </div>
                  )
                }
              )}

            </div>

          ) : (

            <div className="no-results">

              <div className="no-results-icon">
                🔎
              </div>

              <h3>
                {ui.noResults}
              </h3>

              <p>
                {ui.noResultsDescription}
              </p>

            </div>

          )}

        </section>

        {/* ================= ABOUT ================= */}

        <section
          className="about"
          id="about"
        >

          <div className="about-content">

            <p className="section-subtitle">
              {t.about.subtitle}
            </p>

            <h2>
              {t.about.title}
            </h2>

            <p className="about-description">
              {t.about.description1}
            </p>

            <p className="about-description">
              {t.about.description2}
            </p>

            <div className="about-features">

              <div className="about-feature">
                <span>✨</span>
                <h3>
                  {t.about.features.selected.title}
                </h3>
                <p>
                  {t.about.features.selected.description}
                </p>
              </div>

              <div className="about-feature">
                <span>💗</span>
                <h3>
                  {t.about.features.elegance.title}
                </h3>
                <p>
                  {t.about.features.elegance.description}
                </p>
              </div>

              <div className="about-feature">
                <span>🛍️</span>
                <h3>
                  {t.about.features.experience.title}
                </h3>
                <p>
                  {t.about.features.experience.description}
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* ================= CONTACT ================= */}

        <section
          className="contact"
          id="contact"
        >

          <p className="section-subtitle">
            {t.contact.subtitle}
          </p>

          <h2>
            {t.contact.title}
          </h2>

          <p>
            {t.contact.description}
          </p>

          <button className="contact-button">
            {t.contact.button}
          </button>

        </section>

      </main>

      {/* ================= PRODUCT DETAILS ================= */}

      {selectedProduct && (

        <div className="product-modal">

          <div className="product-modal-panel">

            <button
              className="modal-close"
              onClick={closeProduct}
              aria-label={ui.close}
            >
              ×
            </button>

            <div className="product-detail-layout">

              <div className="product-detail-image">
                <img
                  src={
                    selectedProduct.image
                  }
                  alt={
                    t.products?.[
                      selectedProduct
                        .translationKey
                    ]?.name
                  }
                />
              </div>

              <div className="product-detail-content">

                <p className="product-category">
                  {t.products?.[
                    selectedProduct
                      .translationKey
                  ]?.category ||
                    selectedProduct.subcategory}
                </p>

                <h2>
                  {t.products?.[
                    selectedProduct
                      .translationKey
                  ]?.name ||
                    selectedProduct.translationKey}
                </h2>

                <div className="detail-rating">
                  ⭐ {selectedProduct.rating}
                </div>

                <div className="detail-price">

                  {selectedProduct.oldPrice >
                    selectedProduct.price && (
                    <span className="old-price">
                      {selectedProduct.oldPrice} DH
                    </span>
                  )}

                  <strong>
                    {selectedProduct.price} DH
                  </strong>

                </div>

                <p className="detail-description">
                  {t.products?.[
                    selectedProduct
                      .translationKey
                  ]?.description ||
                    selectedProduct.description}
                </p>

                <div className="detail-information">

                  <div>
                    <strong>
                      {ui.brand}
                    </strong>
                    <span>
                      {selectedProduct.brand}
                    </span>
                  </div>

                  <div>
                    <strong>
                      {ui.volume}
                    </strong>
                    <span>
                      {selectedProduct.volume}
                    </span>
                  </div>

                </div>

                <div className="quantity-section">

                  <span>
                    {ui.quantity}
                  </span>

                  <div className="quantity-control">

                    <button
                      onClick={() =>
                        setSelectedQuantity(
                          Math.max(
                            1,
                            selectedQuantity - 1
                          )
                        )
                      }
                      aria-label={
                        ui.decrease
                      }
                    >
                      −
                    </button>

                    <span>
                      {selectedQuantity}
                    </span>

                    <button
                      onClick={() =>
                        setSelectedQuantity(
                          selectedQuantity + 1
                        )
                      }
                      aria-label={
                        ui.increase
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

                <button
                  className="detail-add-button"
                  onClick={() =>
                    addToCart(
                      selectedProduct,
                      selectedQuantity
                    )
                  }
                >
                  🛒 {ui.addToCart}
                </button>

                <button
                  className="detail-buy-button"
                  onClick={() => {
                    addToCart(
                      selectedProduct,
                      selectedQuantity
                    )
                    setCheckoutOpen(true)
                  }}
                >
                  {ui.buyNow}
                </button>

              </div>

            </div>

            {/* REVIEWS */}

            <div className="reviews-section">

              <h3>
                {ui.customerReviews}
              </h3>

              <div className="reviews-empty">

                <div>
                  💬
                </div>

                <strong>
                  {ui.noReviews}
                </strong>

                <p>
                  {ui.writeReview}
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ================= CART ================= */}

      {cartOpen && (

        <div
          className="cart-overlay"
          onClick={() =>
            setCartOpen(false)
          }
        >

          <div
            className="cart-panel"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="cart-close"
              onClick={() =>
                setCartOpen(false)
              }
            >
              ×
            </button>

            <p className="section-subtitle">
              {t.cart.subtitle}
            </p>

            <h2>
              {t.cart.title}
            </h2>

            {cartItems.length === 0 ? (

              <div className="cart-empty">

                <div className="cart-empty-icon">
                  🛍️
                </div>

                <h3>
                  {ui.cartEmpty}
                </h3>

                <p>
                  {ui.cartDescription}
                </p>

                <button
                  className="cart-continue"
                  onClick={() =>
                    setCartOpen(false)
                  }
                >
                  {ui.continueShopping}
                </button>

              </div>

            ) : (

              <div className="cart-items">

                {cartItems.map(
                  (item) => {

                    const itemTranslation =
                      t.products?.[
                        item.translationKey
                      ]

                    return (
                      <div
                        className="cart-item"
                        key={item.id}
                      >

                        <img
                          src={item.image}
                          alt={
                            itemTranslation?.name ||
                            item.brand
                          }
                        />

                        <div className="cart-item-info">

                          <h3>
                            {itemTranslation?.name}
                          </h3>

                          <p>
                            {item.price} DH
                          </p>

                          <div className="cart-quantity">

                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  -1
                                )
                              }
                            >
                              −
                            </button>

                            <span>
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  1
                                )
                              }
                            >
                              +
                            </button>

                          </div>

                          <button
                            className="cart-remove"
                            onClick={() =>
                              removeFromCart(
                                item.id
                              )
                            }
                          >
                            {ui.remove}
                          </button>

                        </div>

                        <strong>
                          {(
                            item.price *
                            item.quantity
                          ).toFixed(2)}{' '}
                          DH
                        </strong>

                      </div>
                    )
                  }
                )}

                <div className="cart-total">

                  <span>
                    {ui.total}
                  </span>

                  <strong>
                    {cartTotal.toFixed(2)} DH
                  </strong>

                </div>

                <button
                  className="checkout-button"
                  onClick={() =>
                    setCheckoutOpen(true)
                  }
                >
                  {ui.checkout}
                </button>

              </div>
            )}

          </div>

        </div>
      )}

      {/* ================= CHECKOUT ================= */}

      {checkoutOpen && (

        <div
          className="checkout-overlay"
          onClick={() =>
            setCheckoutOpen(false)
          }
        >

          <div
            className="checkout-panel"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setCheckoutOpen(false)
              }
            >
              ×
            </button>

            <p className="section-subtitle">
              {t.cart.title}
            </p>

            <h2>
              {ui.checkout}
            </h2>

            <div className="checkout-icon">
              🛍️
            </div>

            <p>
              {ui.checkoutDescription}
            </p>

            <div className="checkout-summary">

              <span>
                {ui.total}
              </span>

              <strong>
                {cartTotal.toFixed(2)} DH
              </strong>

            </div>

            <button
              className="whatsapp-checkout-button"
              onClick={() => {
                /*
                  WhatsApp number will be added later.
                  This button is only the visual checkout
                  interface for now.
                */
                alert(
                  'WhatsApp checkout will be connected later.'
                )
              }}
            >
              💬 WhatsApp
            </button>

          </div>

        </div>

      )}

      {/* ================= CUSTOMER AREA ================= */}

      {customerSpaceOpen && (

        <div
          className="customer-overlay"
          onClick={() =>
            setCustomerSpaceOpen(false)
          }
        >

          <div
            className="customer-panel"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setCustomerSpaceOpen(false)
              }
            >
              ×
            </button>

            <p className="section-subtitle">
              {ui.customerSpace}
            </p>

            <h2>
              {ui.trackOrder}
            </h2>

            <p className="customer-description">
              {ui.customerAccountDescription}
            </p>

            <div className="customer-form">

              <label>
                {ui.fullName}

                <input
                  type="text"
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(
                      e.target.value
                    )
                  }
                  placeholder={
                    ui.fullName
                  }
                />
              </label>

              <label>
                {ui.phone}

                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) =>
                    setCustomerPhone(
                      e.target.value
                    )
                  }
                  placeholder={
                    ui.phone
                  }
                />
              </label>

              <label>
                {ui.trackingNumber}

                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) =>
                    setTrackingNumber(
                      e.target.value
                    )
                  }
                  placeholder={
                    ui.enterTracking
                  }
                />
              </label>

              <button
                className="track-button"
                onClick={
                  trackCustomerOrder
                }
              >
                🔎 {ui.track}
              </button>

            </div>

            {trackedOrder ===
              'not-found' && (

              <div className="tracking-error">

                <strong>
                  {ui.orderNotFound}
                </strong>

                <p>
                  {ui.orderNotFoundDescription}
                </p>

              </div>
            )}

            {trackedOrder &&
              trackedOrder !==
                'not-found' && (

              <div className="order-result">

                <div className="order-status-header">

                  <span>
                    {ui.orderStatus}
                  </span>

                  <strong
                    className={`status-badge ${getStatusClass(
                      trackedOrder.status
                    )}`}
                  >
                    {ui[
                      trackedOrder.status ===
                      'processing'
                        ? 'statusProcessing'
                        : trackedOrder.status ===
                          'prepared'
                        ? 'statusPrepared'
                        : trackedOrder.status ===
                          'shipped'
                        ? 'statusShipped'
                        : trackedOrder.status ===
                          'in-transit'
                        ? 'statusInTransit'
                        : trackedOrder.status ===
                          'delivered'
                        ? 'statusDelivered'
                        : 'statusCancelled'
                    ]}
                  </strong>

                </div>

                <div className="order-timeline">

                  <div
                    className={
                      trackedOrder.status ===
                        'processing'
                        ? 'timeline-step active'
                        : 'timeline-step'
                    }
                  >
                    <span>1</span>
                    <p>
                      {ui.statusProcessing}
                    </p>
                  </div>

                  <div
                    className={
                      trackedOrder.status ===
                        'prepared'
                        ? 'timeline-step active'
                        : 'timeline-step'
                    }
                  >
                    <span>2</span>
                    <p>
                      {ui.statusPrepared}
                    </p>
                  </div>

                  <div
                    className={
                      trackedOrder.status ===
                        'in-transit'
                        ? 'timeline-step active'
                        : 'timeline-step'
                    }
                  >
                    <span>3</span>
                    <p>
                      {ui.statusInTransit}
                    </p>
                  </div>

                  <div
                    className={
                      trackedOrder.status ===
                        'delivered'
                        ? 'timeline-step active'
                        : 'timeline-step'
                    }
                  >
                    <span>4</span>
                    <p>
                      {ui.statusDelivered}
                    </p>
                  </div>

                </div>

                <div className="order-details">

                  <h3>
                    {ui.orderDetails}
                  </h3>

                  {trackedOrder.items.map(
                    (item) => {

                      const itemTranslation =
                        t.products?.[
                          item.translationKey
                        ]

                      return (
                        <div
                          className="tracked-product"
                          key={item.id}
                        >

                          <img
                            src={item.image}
                            alt={
                              itemTranslation?.name
                            }
                          />

                          <div>

                            <strong>
                              {itemTranslation?.name}
                            </strong>

                            <p>
                              {ui.quantity}:{' '}
                              {item.quantity}
                            </p>

                            <p>
                              {item.price} DH
                            </p>

                          </div>

                        </div>
                      )
                    }
                  )}

                  <div className="tracked-info">

                    <p>
                      <strong>
                        {ui.trackingNumber}:
                      </strong>{' '}
                      {
                        trackedOrder.trackingNumber
                      }
                    </p>

                    <p>
                      <strong>
                        {ui.orderDate}:
                      </strong>{' '}
                      {trackedOrder.date}
                    </p>

                  </div>

                  {trackedOrder.status ===
                    'cancelled' && (

                    <div className="cancellation-box">

                      <strong>
                        {ui.cancellationReason}
                      </strong>

                      <p>
                        {
                          trackedOrder.cancellationReason
                        }
                      </p>

                    </div>
                  )}

                </div>

              </div>
            )}

          </div>

        </div>
      )}

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <h2>
          Uma Z&S Beauty
        </h2>

        <p>
          {t.footer.description}
        </p>

        <div className="footer-links">

          <a href="#">
            {t.footer.instagram}
          </a>

          <a href="#">
            {t.footer.whatsapp}
          </a>

        </div>

        <p className="copyright">
          {t.footer.copyright}
        </p>

      </footer>

    </div>
  )
}

export default App