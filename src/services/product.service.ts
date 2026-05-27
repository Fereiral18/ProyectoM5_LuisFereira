import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Product } from "../types/products.type";

const productsCollection = collection(db, "products");

//* trae todos los productos:
export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(productsCollection);

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Product,
  );
};

//* trae productos por id:
export const getProductById = async (
  productId: string,
): Promise<Product | null> => {
  const documentRef = doc(db, "products", productId);

  const snapshot = await getDoc(documentRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Product;
};
export const updateProduct =
	async (
		productId: string,
		data: Partial<Product>
	) => {
		const documentRef =
			doc(
				db,
				"products",
				productId
			);

		await updateDoc(
			documentRef,
			data
		);
	};
export const deleteProduct =
	async (
		productId: string
	) => {
		const documentRef =
			doc(
				db,
				"products",
				productId
			);

		await deleteDoc(
			documentRef
		);
	};