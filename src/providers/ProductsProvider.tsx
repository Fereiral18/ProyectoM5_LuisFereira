import { useEffect, useState, useCallback } from "react";

import { getProducts } from "../services/product.service";
import type { Product } from "../types/products.type";

import { ProductsContext } from "../context/products.context";
import { useSearchParams } from "react-router";

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      await delay(2000);

      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    loadProducts();
  }, [category]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        loadProducts,
        search,
        setSearch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
