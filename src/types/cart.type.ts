import type { Product } from "./products.type";


export type CartItem = Product & {
  quantity: number;

};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | {
      type: "ADD_ITEM";
      payload: Product;
    }
  | {
      type: "REMOVE_ITEM";
      payload: string;
    }
  | {
      type: "CLEAR_CART";
    } | {
    type: "INCREASE_QUANTITY";
    payload: string;
  } | {
    type: "DECREASE_QUANTITY";
    payload: string;
  };