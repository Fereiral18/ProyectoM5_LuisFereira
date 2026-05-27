import { useEffect, useState } from "react";
import { subscribeToOrders } from "../services/admin.service";
import type { Order } from "../types/order.type";

export const useAdminAnalytics = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToOrders((data) => {
      setOrders(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

   const totalSales = orders
    .filter((order) => order.status === "paid")
    .reduce((acc, order) => acc + order.total, 0);


  const ordersByDay = orders.reduce((acc: any, order) => {
    const date = new Date(order.createdAt?.seconds * 1000)
      .toISOString()
      .split("T")[0];

    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const topProductsMap = new Map();

  orders.forEach(order => {
    order.items.forEach(item => {
      const existing = topProductsMap.get(item.id);

      if (existing) {
        existing.count += item.quantity;
      } else {
        topProductsMap.set(item.id, {
          name: item.name,
          count: item.quantity,
        });
      }
    });
  });

  const topProducts = Array.from(topProductsMap.values()).sort(
    (a, b) => b.count - a.count
  );

  return {
    orders,
    loading,
    totalSales,
    ordersByDay,
    topProducts,
  };
};