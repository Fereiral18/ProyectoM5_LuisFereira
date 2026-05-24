export type Category = "Moda" | "Audio" | "Tecnologia"| "Accesorios";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  stock: number;
  imageUrl: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};