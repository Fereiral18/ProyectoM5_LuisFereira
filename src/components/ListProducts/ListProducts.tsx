import { useNavigate, useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";


import { useMemo } from "react";
import { getReservedStock } from "../../utils/getReservedStock";

import "./style.css";
import { useOrders } from "../../hooks/useOrder";
import { useDebounce } from "../../hooks/useDebaunce";

export const ListProducts = () => {
  const { products, loading, search } = useProducts();
  const { orders } = useOrders();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const debouncedSearch = useDebounce(search, 500);
 const filteredProducts = useMemo(() => {
  let filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  if (debouncedSearch.trim().length >= 2) {
    filtered = filtered.filter((product) =>
      product.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );
  }

  return filtered;
}, [products, category, debouncedSearch]);

  if (loading) {
    return (
      <section className="products-container">
        <div className="products-header">
          <h2>Productos</h2>
          <p>Estamos cargando los mejores productos para vos...</p>
        </div>

        <div className="products-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="product-skeleton" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="products-container">
      <div className="products-header">
        <h2>Descubrí productos increíbles</h2>

        <p>
          Encontrá las mejores ofertas, tecnología, moda y mucho más.
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-products">
          <h3>No encontramos productos</h3>
          <p>Probá buscando otra categoría o producto.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => {
            // 🔥 AQUÍ VA LA LÓGICA DE STOCK DINÁMICO
            const reservedStock = getReservedStock(product.id, orders);

            const availableStock = Math.max(
              product.stock - reservedStock,
              0
            );

            return (
              <article
                key={product.id}
                className="product-card"
                onClick={() =>
                  navigate(`/products/${product.id}`)
                }
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
                          availableStock > 0
                            ? "stock available"
                            : "stock unavailable"
                        }
                      >
                        {availableStock > 0
                          ? `Stock: ${availableStock}`
                          : "Sin stock"}
                      </span>
                    </div>

                    <button
                      className="buy-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};