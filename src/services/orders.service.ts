import { auth } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/firebase";

import type { Order } from "../types/order.type";

export const approveOrder = async (order: Order) => {
  await runTransaction(db, async (transaction) => {
    const orderRef = doc(db, "orders", order.id);

    const orderSnap = await transaction.get(orderRef);

    if (!orderSnap.exists()) {
      throw new Error("Orden no existe");
    }

    const data = orderSnap.data();

    if (data.status !== "pending") {
      throw new Error("La orden ya fue procesada");
    }

    // 🔥 descontar stock de productos
    for (const item of order.items) {
      const productRef = doc(db, "products", item.id);

      const productSnap = await transaction.get(productRef);

      if (!productSnap.exists()) continue;

      const product = productSnap.data();

      transaction.update(productRef, {
        stock: product.stock - item.quantity,
      });
    }

    transaction.update(orderRef, {
      status: "paid",
    });
  });
};

export const cancelOrder = async (order) => {
  await runTransaction(db, async (transaction) => {
    const orderRef = doc(db, "orders", order.id);

    const orderSnap = await transaction.get(orderRef);

    if (!orderSnap.exists()) {
      throw new Error("Orden no existe");
    }

    const data = orderSnap.data();

    if (data.status !== "pending") {
      throw new Error("No se puede cancelar esta orden");
    }

    // 🔥 devolver stock
    for (const item of order.items) {
      const productRef = doc(db, "products", item.id);

      const productSnap = await transaction.get(productRef);

      if (!productSnap.exists()) continue;

      
    }

    transaction.update(orderRef, {
      status: "cancelled",
      cancelledAt: serverTimestamp(),
    });
  });
};
export const createOrder = async (items, total) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("Usuario no autenticado");
  }

  // 🔥 Leer usuario REAL desde Firestore
  const userRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDoc(userRef);

  const userData = userSnap.data();

  const order = {
    items,
    total,
    status: "pending",
    createdAt: serverTimestamp(),

    userId: currentUser.uid,

    user: {
      uid: currentUser.uid,
      email: userData?.email || currentUser.email,
      displayName: userData?.displayName || "Sin nombre",
    },
  };

  await addDoc(collection(db, "orders"), order);
};

// =========================
// DELETE
// =========================

export const deleteOrder = async (orderId: string) => {
  const ref = doc(db, "orders", orderId);

  await deleteDoc(ref);
};