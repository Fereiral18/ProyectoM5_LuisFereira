import { BrowserRouter } from "react-router";
import { ProductsProvider } from "./ProductsProvider";

interface Props {
  children: React.ReactNode;
}

export const ProviderApp = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <ProductsProvider>{children}</ProductsProvider>
    </BrowserRouter>
  );
};
