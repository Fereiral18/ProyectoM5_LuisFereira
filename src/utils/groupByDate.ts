import type { Order } from "../types/order.type";


export const groupOrdersByDay = (orders: Order[]) => {
  return orders.reduce((acc: Record<string, Order[]>, order) => {
    const date = new Date(order.createdAt?.seconds * 1000)
      .toISOString()
      .split("T")[0];

    if (!acc[date]) acc[date] = [];

    acc[date].push(order);

    return acc;
  }, {});
};