import { BrowserRouter } from "react-router";
import { ProductsProvider } from "./ProductsProvider";
import { AuthProvider } from "./AuthProviders";
import { CartProvider } from "./CartProvider";

interface Props {
  children: React.ReactNode;
}

export const ProviderApp = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>{children}</CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
