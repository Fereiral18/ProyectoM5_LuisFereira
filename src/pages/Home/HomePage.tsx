
import { useProducts } from "../../hooks/useProducts";
import "./style.css";


export const HomePage = () => {
  const { products, loading } = useProducts();

  const featuredProducts = products.slice(0, 6);
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

      <div className="section-header">
        <div>
          <span className="section-badge">
            Destacados
          </span>

          <h2>Productos destacados</h2>

          <p>
            Descubrí los productos más
            populares de nuestra tienda.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="carousel-skeleton">
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <div
                key={index}
                className="skeleton-card"
              />
            )
          )}
        </div>
      ) : (
        <div className="products-carousel">

          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="featured-card"
            >

              {/* IMAGE */}
              <div className="featured-image-container">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="featured-image"
                />
              </div>

              {/* CONTENT */}
              <div className="featured-content">

                <h3>{product.name}</h3>

                <p>
                  {product.description}
                </p>

                <div className="featured-footer">

                  <span className="featured-price">
                    ${product.price}
                  </span>

                  <button>
                    Agregar
                  </button>

                </div>

              </div>

            </article>
          ))}

        </div>
      )}
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