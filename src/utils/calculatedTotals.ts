import type { Order } from "../types/order.type";


export const calculateTotalSales = (orders: Order[]) => {
  return orders.reduce((acc, o) => acc + o.total, 0);
};