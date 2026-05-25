// src/providers/ProductsProvider.tsx

import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/product.service";
import type { Product } from "../types/products.type";
import { ProductsContext } from "../context/products.context";
import { useDebounce } from "../hooks/useDebaunce";

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  //* DEBOUNCE
  const debouncedSearch = useDebounce(search, 500);

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

   //* FILTER PRODUCTS
  const filteredProducts = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return products;
    }

    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(
          debouncedSearch.toLowerCase()
        )
    );
  }, [products, debouncedSearch]);

  return (
    <ProductsContext.Provider
      value={{
        products: filteredProducts,

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
