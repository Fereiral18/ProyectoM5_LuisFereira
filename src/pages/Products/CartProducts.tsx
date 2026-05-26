import { useNavigate, useParams } from "react-router";
import { useProducts } from "../../hooks/useProducts";

import "./style.css";
import { useCart } from "../../hooks/useCart";

export const CartProducts = () => {
  const { id } = useParams();
    const { addItem } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    return <h2>Cargando producto...</h2>;
  }
  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <section className="product-detail">
      <button className="back-button" onClick={() => navigate("/products")}>
        ← Volver a productos
      </button>
      {/* IMAGE */}
      <div className="detail-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="detail-image"
        />
      </div>

      {/* INFO */}
      <div className="detail-content">
        <span className="detail-category">{product.category}</span>

        <h1>{product.name}</h1>

        <p className="detail-description">{product.description}</p>

        <div className="detail-stock">Stock: {product.stock}</div>

        <div className="detail-price">${product.price}</div>

       <button
          className="add-cart-btn"
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
      </div>
    </section>
  );
};
