import type { CartItem } from "./cart.type";
import type { OrderStatus } from "./ordersStatus.type";


export type Order = {
  id: string;
  userId: string;
  user: {
    uid: string;
    email: string;
    displayName?: string;
  };
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: any;
};