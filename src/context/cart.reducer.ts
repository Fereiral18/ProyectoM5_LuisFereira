import type { CartAction, CartState } from "../types/cart.type";


export const initialState: CartState = {
  items: [],
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
  const product = action.payload;

  const exists = state.items.find(item => item.id === product.id);

  if (exists) {
    return state; //no modifica quantity
  }

  return {
    ...state,
    items: [
      ...state.items,
      {
        ...product,
        quantity: 1,
      },
    ],
  };
}

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return { items: [] };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0),
      };

    default:
      return state;
  }
}