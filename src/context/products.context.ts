import { createContext } from "react";
import type { Product } from "../types/products.type";

export type ProductsContextType = {
  products: Product[];
  loading: boolean;
  loadProducts: () => Promise<void>;
  search: string;

  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export const ProductsContext = createContext<ProductsContextType | null>(null);
