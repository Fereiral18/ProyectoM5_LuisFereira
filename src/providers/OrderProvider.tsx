import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

import { db } from "../config/firebase";

import type { Order } from "../types/order.type";

interface OrdersContextType {
  orders: Order[];
}

export const OrdersContext = createContext<OrdersContextType>({
  orders: [],
});

export const OrdersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const ordersRef = collection(db, "orders");

    const unsubscribe = onSnapshot(
      ordersRef,

      (snapshot) => {
      const data = snapshot.docs.map((doc) => {
  const raw = doc.data();

  return {
    ...raw,
    id: doc.id,
  } as Order;
});
        console.log("ORDERS FIREBASE:", data);

        setOrders(data);
      },

      (error) => {
        console.error("ORDERS ERROR:", error);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <OrdersContext.Provider value={{ orders }}>
      {children}
    </OrdersContext.Provider>
  );
};