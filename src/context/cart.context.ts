import { createContext } from "react";
import type { Product } from "../types/products.type";
import type { CartItem } from "../types/cart.type";


export type CartContextType = {
  items: CartItem[];

  addItem: (product: Product) => void;

  removeItem: (id: string) => void;

  clearCart: () => void;
    increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
};

export const CartContext = createContext<CartContextType | null>(null);