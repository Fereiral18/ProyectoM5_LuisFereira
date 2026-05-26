import { useCart } from "../hooks/useCart";
import { createOrder } from "../services/checkout.service";
import "./styles.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartModal = ({ isOpen, onClose }: Props) => {
  const { items, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  if (!isOpen) return null;

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    try {
      await createOrder(items);

      clearCart();

      alert("Compra realizada con éxito 🎉");
    } catch (error: any) {
      alert(error.message || "Error en la compra");
    }
  };
  const formattedTotal = Number(total.toFixed(2));
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Tu carrito</h2>

          <button onClick={onClose}>✖</button>
        </div>

        {items.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} />

                  <div className="cart-info">
                    <h4>{item.name}</h4>
                    <p>${item.price}</p>

                    {/* BOTONES +/- */}
                    <div className="qty-controls">
                      <button onClick={() => decreaseQuantity(item.id)}>
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <h3>Total: ${formattedTotal}</h3>

              <button className="buy-btn" onClick={handleCheckout}>
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
