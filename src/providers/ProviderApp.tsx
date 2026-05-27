import { BrowserRouter } from "react-router";
import { AuthProvider } from "./AuthProviders";
import { ProductsProvider } from "./ProductsProvider";
import { OrdersProvider } from "./OrderProvider";
import { CartProvider } from "./CartProvider";



type Props = {
  children: React.ReactNode;
};

export const ProviderApp = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <OrdersProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </OrdersProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};