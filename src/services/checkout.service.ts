import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db, auth } from "../config/firebase";
import type { CartItem } from "../types/cart.type";

export const createOrder = async (items: CartItem[]) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  // 🔥 VALIDAR STOCK
  for (const item of items) {
    const productRef = doc(db, "products", item.id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      throw new Error(`Producto no existe: ${item.name}`);
    }

    const data = snapshot.data() as { stock: number };

    if (data.stock < item.quantity) {
      throw new Error(`Stock insuficiente para ${item.name}`);
    }
  }

  // 💰 TOTAL
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 🧠 ORDER FINAL (CON USER SNAPSHOT)
  const order = {
    userId:user.uid,

    user: {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "Sin nombre",
    },

    items,
    total,
    status: "pending",
    createdAt: serverTimestamp(),
  };

  const orderRef = await addDoc(collection(db, "orders"), order);

  return orderRef.id;
};