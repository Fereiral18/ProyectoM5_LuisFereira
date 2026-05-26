import { doc, writeBatch, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import type { CartItem } from "../types/cart.type";

export const createOrder = async (items: CartItem[]) => {
  const batch = writeBatch(db);

  for (const item of items) {
    const productRef = doc(db, "products", item.id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      throw new Error(`Producto no existe: ${item.id}`);
    }

    const data = snapshot.data() as { stock: number };

    // 🔥 VALIDACIÓN DE STOCK REAL
    if (data.stock < item.quantity) {
      throw new Error(`Stock insuficiente para ${item.name}`);
    }

    batch.update(productRef, {
      stock: data.stock - item.quantity,
      updatedAt: new Date(),
    });
  }

  await batch.commit();
};