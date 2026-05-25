import { Route, Routes } from "react-router";
import { HomePage } from "../pages/Home/HomePage";

import { RegisterPage } from "../pages/Register/RegisterPage";
import { LoginPage } from "../pages/login/LoginPage";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "./PrivatesRoutes";
import { ProductPage } from "../pages/Products/ProductPage";
import { CartProducts } from "../pages/Products/CartProducts";

export const AppRouters = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products/:id" element={<CartProducts />} />
        </Route>
      </Route>
    </Routes>
  );
};
