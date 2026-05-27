import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

import type { Product } from "../types/products.type";
import { ProductsContext } from "../context/products.context";
import { useSearchParams } from "react-router-dom";


const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function ProductsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    let isMounted = true;

    const productsRef = collection(db, "products");

    setLoading(true);

    const unsubscribe = onSnapshot(productsRef, async (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      // ⏳ delay simulado de UX
      await delay(2000);

      if (!isMounted) return;

      setProducts(data);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return (
   
   <ProductsContext.Provider
	value={{
		products,
		setProducts,
		loading,
		search,
		setSearch,
	}}
>
      {children}
    </ProductsContext.Provider>
  );
}