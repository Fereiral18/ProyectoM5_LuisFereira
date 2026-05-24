import { BrowserRouter } from "react-router";
import { ProductsProvider } from "./ProductsProvider";
import { AuthProvider } from "./AuthProviders";

interface Props {
  children: React.ReactNode;
}

export const ProviderApp = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>{children}</ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
