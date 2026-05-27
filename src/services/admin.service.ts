import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import type { Order } from "../types/order.type";
import { db } from "../lib/firebase";

export const subscribeToOrders = (
  callback: (orders: Order[]) => void
) => {
  const ref = collection(db, "orders");

  const unsubscribe = onSnapshot(ref, (snapshot) => {
   

    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];

  

    callback(orders);
  });

  return unsubscribe;
};