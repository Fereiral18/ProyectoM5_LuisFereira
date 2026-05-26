import type { Order } from "../types/order.type";


export const getTopProducts = (orders: Order[]) => {
  const map = new Map<string, { name: string; count: number }>();

  orders.forEach(order => {
    order.items.forEach(item => {
      const existing = map.get(item.id);

      if (existing) {
        existing.count += item.quantity;
      } else {
        map.set(item.id, {
          name: item.name,
          count: item.quantity,
        });
      }
    });
  });

  return Array.from(map.values()).sort(
    (a, b) => b.count - a.count
  );
};