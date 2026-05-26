import { collection, getDocs } from "firebase/firestore";
import type { Order } from "../types/order.type";
import { db } from "../config/firebase";


// 📊 TRAER TODAS LAS ORDENES
export const getAllOrders = async (): Promise<Order[]> => {
  const snap = await getDocs(collection(db, "orders"));

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
};