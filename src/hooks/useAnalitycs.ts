import { useEffect, useState } from "react";
import type { Order } from "../types/order.type";
import { getAllOrders } from "../services/admin.service";


export const useAdminAnalytics = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllOrders();
      setOrders(data);
      setLoading(false);
    };

    fetch();
  }, []);

  // 💰 TOTAL VENTAS
  const totalSales = orders.reduce(
    (acc, o) => acc + o.total,
    0
  );

  // 📅 ÓRDENES POR DÍA
  const ordersByDay = orders.reduce((acc: any, order) => {
    const date = new Date(order.createdAt?.seconds * 1000)
      .toISOString()
      .split("T")[0];

    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // 🔥 TOP PRODUCTOS
  const topProductsMap = new Map<string, { name: string; count: number }>();

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