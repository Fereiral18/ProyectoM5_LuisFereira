import "./style.css";

export const HomePage = () => {
  return (
    <main className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">🔥 Ofertas de temporada</span>

          <h1>
            Descubrí productos increíbles al mejor precio
          </h1>

          <p>
            Tecnología, moda, accesorios y mucho más con envío rápido y seguro.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Comprar ahora</button>
            <button className="secondary-btn">Ver categorías</button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="Productos ecommerce"
          />
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="categories">
        <h2>Categorías destacadas</h2>

        <div className="categories-grid">
          <div className="category-card">💻 Tecnología</div>
          <div className="category-card">👕 Moda</div>
          <div className="category-card">🎧 Audio</div>
          <div className="category-card">⌚ Accesorios</div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="featured-products">
        <h2>Productos destacados</h2>

        <div className="products-grid">

          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              alt="Producto"
            />

            <h3>Zapatillas Urban</h3>

            <p className="price">$89.99</p>

            <button>Agregar al carrito</button>
          </div>

          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
              alt="Producto"
            />

            <h3>Smartphone Pro</h3>

            <p className="price">$999.99</p>

            <button>Agregar al carrito</button>
          </div>

          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
              alt="Producto"
            />

            <h3>Auriculares Premium</h3>

            <p className="price">$199.99</p>

            <button>Agregar al carrito</button>
          </div>

        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="benefits">
        <div className="benefit-card">
          🚚 Envíos rápidos
        </div>

        <div className="benefit-card">
          🔒 Pagos seguros
        </div>

        <div className="benefit-card">
          💳 Hasta 12 cuotas
        </div>

        <div className="benefit-card">
          ⭐ Garantía oficial
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <h2>Recibí ofertas exclusivas</h2>

        <p>
          Suscribite y enterate primero de descuentos y novedades.
        </p>

        <div className="newsletter-form">
          <input type="email" placeholder="Tu correo electrónico" />
          <button>Suscribirme</button>
        </div>
      </section>

    </main>
  );
};