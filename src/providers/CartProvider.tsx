import { useReducer } from "react";
import type { Product } from "../types/products.type";
import { cartReducer, initialState } from "../context/cart.reducer";
import { CartContext } from "../context/cart.context";


export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  function addItem(product: Product) {
    dispatch({
      type: "ADD_ITEM",
      payload: product,
    });
  }

  function removeItem(id: string) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  }

  function clearCart() {
    dispatch({
      type: "CLEAR_CART",
    });
  }
  function increaseQuantity(id: string) {
  const item = state.items.find(i => i.id === id);

  if (!item) return;

  if (item.quantity >= item.stock) return;

  dispatch({
    type: "INCREASE_QUANTITY",
    payload: id,
  });
}

function decreaseQuantity(id: string) {
  dispatch({
    type: "DECREASE_QUANTITY",
    payload: id,
  });
}
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}