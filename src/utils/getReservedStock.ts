import type { Order } from "../types/order.type";

export const getReservedStock = (
  productId: string,
  orders: Order[]
) => {
  return orders
    .filter((o) => o.status === "pending") // SOLO órdenes activas
    .reduce((acc, order) => {
      const item = order.items.find((i) => i.id === productId);
      return acc + (item?.quantity || 0);
    }, 0);
};