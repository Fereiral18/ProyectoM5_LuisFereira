import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";

import "./style.css";
import { useCart } from "../../hooks/useCart";
import { useOrders } from "../../hooks/useOrder";
import { getReservedStock } from "../../utils/getReservedStock";

export const CardProducts = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { orders } = useOrders();

  if (!product) {
    return <h2>Cargando producto...</h2>;
  }

  const reservedStock = getReservedStock(product.id, orders);

  const availableStock = Math.max(product.stock - reservedStock, 0);

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

        <div className="detail-stock">Stock disponible: {availableStock}</div>

        <div className="detail-price">${product.price}</div>

       <button
  className="add-cart-btn"
  onClick={handleAddToCart}
  disabled={availableStock <= 0}
>
  {availableStock <= 0
    ? "Sin stock"
    : "Agregar al carrito"}
</button>
      </div>
    </section>
  );
};
