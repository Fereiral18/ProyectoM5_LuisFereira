// src/providers/ProductsProvider.tsx

import { useEffect, useState } from "react";
import { getProducts } from "../services/product.service";
import type { Product } from "../types/products.type";
import { ProductsContext } from "../context/products.context";


export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadProducts() {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        loadProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}