import { useState } from 'react'
function App() {
  const [category, setCategory] = useState('All')
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="store">

      {/* ================= HEADER ================= */}

      <header className="header">

        <div className="logo">
          <h1>Uma Z&S Beauty</h1>
        </div>

        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#collections">Collections</a>
          <a href="#shop">Shop</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </nav>

        <button
  className="cart-button"
  onClick={() => setCartOpen(true)}
>
  🛒 Cart
</button>

      </header>


      {/* ================= MAIN ================= */}

      <main>

        {/* HERO */}

        <section
          className="hero"
          id="home"
          style={{
            backgroundImage: "url('/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <p className="hero-small-title">
              WELCOME TO
            </p>

            <h2>
              Uma Z&S
              <span>Beauty</span>
            </h2>

            <p className="hero-description">
              Discover beauty, elegance and carefully selected
              accessories made to make you shine.
            </p>

            <a href="#shop" className="shop-button">
              Shop Now
            </a>

          </div>

          <div className="floating-card card-one">
            ✨ Beauty
          </div>

          <div className="floating-card card-two">
            💗 Elegance
          </div>

        </section>


        {/* ================= COLLECTIONS ================= */}

        <section 
          className="collections"
          id="collections"
        >

          <p className="section-subtitle">
            DISCOVER
          </p>

          <h2>
            Our Collections
          </h2>


          <div className="collection-grid">


            {/* MAKEUP */}

            <div className="collection-card">

             <div className="collection-image">
  <img src="/makeup.jpg" alt="Makeup" />
</div>
              <h3>
                Makeup
              </h3>

              <p>
                Discover our makeup collection.
              </p>

              <button>
                Explore
              </button>

            </div>


            {/* ACCESSORIES */}

            <div className="collection-card">

              <div className="collection-image">
  <img src="/accessories.jpg" alt="Accessories" />
</div>

              <h3>
                Accessories
              </h3>

              <p>
                Beautiful accessories for every style.
              </p>

              <button>
                Explore
              </button>

            </div>

{/* PERFUMES */}

<div className="collection-card">

  <div className="collection-image">
    <img src="/perfumes.jpg" alt="Perfumes" />
  </div>

  <h3>
    Perfumes
  </h3>

  <p>
    Discover our beautiful perfume collection.
  </p>

  <button>
    Explore
  </button>

</div>

            {/* BEAUTY */}

            <div className="collection-card">

             <div className="collection-image">
  <img src="/beauty.jpg" alt="Beauty" />
</div>

              <h3>
                Beauty
              </h3>

              <p>
                Products to complete your beauty routine.
              </p>

              <button>
                Explore
              </button>

            </div>

          </div>

        </section>

        {/* ================= SHOP ================= */}

<section className="shop" id="shop">

  <p className="section-subtitle">
    OUR STORE
  </p>

  <h2>
    Shop
  </h2>

  <p className="shop-intro">
    Discover our beauty and accessories collection.
  </p>

  <div className="shop-filters">

 <button
  className={category === 'All' ? 'active' : ''}
  onClick={() => setCategory('All')}
>
  All
</button>

  <button
  className={category === 'Makeup' ? 'active' : ''}
  onClick={() => setCategory('Makeup')}
>
  Makeup
</button>

  <button
  className={category === 'Perfumes' ? 'active' : ''}
  onClick={() => setCategory('Perfumes')}
>
  Perfumes
</button>

  <button
  className={category === 'Accessories' ? 'active' : ''}
  onClick={() => setCategory('Accessories')}
>
  Accessories
</button>

  <button
  className={category === 'Beauty' ? 'active' : ''}
  onClick={() => setCategory('Beauty')}
>
  Beauty
</button>

</div>

  <div className="shop-empty">

    <div className="shop-empty-icon">
      ✨
    </div>

    <h3>
      Our collection is coming soon
    </h3>

    <p>
      Beautiful products will be available here soon.
    </p>

  </div>

</section>


        {/* ================= ABOUT ================= */}

        <section
  className="about"
  id="about"
>

  <div className="about-content">

    <p className="section-subtitle">
      ABOUT US
    </p>

    <h2>
      Beauty made for you
    </h2>

    <p className="about-description">
      At Uma Z&S Beauty, we believe that beauty is all about
      feeling confident, elegant, and comfortable in your own style.
    </p>

    <p className="about-description">
      We carefully select beauty products, makeup, perfumes,
      and accessories to bring you a collection that makes
      every look feel special.
    </p>

    <div className="about-features">

      <div className="about-feature">
        <span>✨</span>
        <h3>Carefully Selected</h3>
        <p>
          Products chosen with attention to quality and style.
        </p>
      </div>

      <div className="about-feature">
        <span>💗</span>
        <h3>Beauty & Elegance</h3>
        <p>
          Everything you need to express your personal style.
        </p>
      </div>

      <div className="about-feature">
        <span>🛍️</span>
        <h3>A Beautiful Experience</h3>
        <p>
          A simple and enjoyable shopping experience.
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
            GET IN TOUCH
          </p>

          <h2>
            Contact Us
          </h2>

          <p>
            Have a question? We would love to hear from you.
          </p>

          <button className="contact-button">
            Contact Us
          </button>

        </section>

      </main>

{/* ================= CART ================= */}

{cartOpen && (
  <div className="cart-overlay" onClick={() => setCartOpen(false)}>

    <div
      className="cart-panel"
      onClick={(e) => e.stopPropagation()}
    >

      <button
        className="cart-close"
        onClick={() => setCartOpen(false)}
      >
        ×
      </button>

      <p className="section-subtitle">
        YOUR SHOPPING BAG
      </p>

      <h2>Your Cart</h2>

      <div className="cart-empty">
        <div className="cart-empty-icon">
          🛍️
        </div>

        <h3>Your cart is empty</h3>

        <p>
          Add products to your cart and they will appear here.
        </p>

        <button
          className="cart-continue"
          onClick={() => setCartOpen(false)}
        >
          Continue Shopping
        </button>
      </div>

    </div>

  </div>
)}

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <h2>
          Uma Z&S Beauty
        </h2>

        <p>
          Beauty & Accessories
        </p>

        <div className="footer-links">

          <a href="#">
            Instagram
          </a>

          <a href="#">
            WhatsApp
          </a>

        </div>

        <p className="copyright">
          © 2026 Uma Z&S Beauty. All rights reserved.
        </p>

      </footer>

    </div>
  )
}

export default App