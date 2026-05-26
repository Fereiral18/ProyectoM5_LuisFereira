import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { CartModal } from "./CartModal";
import "./styles.css";

export const CartWidget = () => {
  const { items } = useCart();

  const [open, setOpen] = useState(false);

  const totalItems = items.map((item)=> item).length

  return (
    <>
      <button
        className="cart-widget"
        onClick={() => setOpen(true)}
      >
        <span className="cart-icon">🛒</span>

        {totalItems > 0 && (
          <span className="cart-badge">
            {totalItems}
          </span>
        )}
      </button>

      <CartModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};