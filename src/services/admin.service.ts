import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import type { Order } from "../types/order.type";
import { db } from "../config/firebase";

export const subscribeToOrders = (
  callback: (orders: Order[]) => void
) => {
  const ref = collection(db, "orders");

  const unsubscribe = onSnapshot(ref, (snapshot) => {
    console.log("🔥 SNAPSHOT UPDATE");

    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];

    console.log("ORDERS:", orders);

    callback(orders);
  });

  return unsubscribe;
};