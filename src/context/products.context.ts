import { createContext } from "react";

import type {
	Product,
} from "../types/products.type";

export type ProductsContextType =
	{
		products: Product[];

		setProducts:
			React.Dispatch<
				React.SetStateAction<
					Product[]
				>
			>;

		loading: boolean;

		search: string;

		setSearch:
			React.Dispatch<
				React.SetStateAction<string>
			>;
	};

export const ProductsContext =
	createContext<ProductsContextType | null>(
		null
	);