// ListProducts.tsx

import { useProducts } from "../../hooks/useProducts";

import "./style.css";

export const ListProducts = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <section className="products-container">
        <div className="products-header">
          <h2>Productos</h2>
          <p>Estamos cargando los mejores productos para vos...</p>
        </div>

        <div className="products-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="product-skeleton"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="products-container">

      {/* HEADER */}
      <div className="products-header">
        <h2>Descubrí productos increíbles</h2>

        <p>
          Encontrá las mejores ofertas,
          tecnología, moda y mucho más.
        </p>
      </div>

      {/* EMPTY STATE */}
      {products.length === 0 ? (
        <div className="empty-products">
          <h3>No encontramos productos</h3>

          <p>
            Probá buscando otra categoría
            o producto.
          </p>
        </div>
      ) : (
        <div className="products-grid">

          {products.map((product) => (
            <article
              key={product.id}
              className="product-card"
            >

              {/* IMAGE */}
              <div className="product-image-container">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
              </div>

              {/* INFO */}
              <div className="product-content">

                <h3 className="product-title">
                  {product.name}
                </h3>

                <p className="product-description">
                  {product.description}
                </p>

                <div className="product-footer">

                  <div>
                    <p className="product-price">
                      ${product.price}
                    </p>

                    <span
                      className={
                        product.stock > 0
                          ? "stock available"
                          : "stock unavailable"
                      }
                    >
                      {product.stock > 0
                        ? `Stock: ${product.stock}`
                        : "Sin stock"}
                    </span>
                  </div>

                  <button className="buy-button">
                    Comprar
                  </button>

                </div>

              </div>

            </article>
          ))}

        </div>
      )}
    </section>
  );
};