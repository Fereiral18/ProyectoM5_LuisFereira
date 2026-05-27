import { Route, Routes } from "react-router";
import { HomePage } from "../pages/Home/HomePage";
import { RegisterPage } from "../pages/Register/RegisterPage";
import { LoginPage } from "../pages/login/LoginPage";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "./PrivatesRoutes";
import { ProductPage } from "../pages/Products/ProductPage";
import { CardProducts } from "../pages/Products/CardProducts";
import { AdminRoute } from "./AdminRoutes";
import { AdminPage } from "../pages/admin/AdminPage";



export const AppRouters = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* USER PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/products/:id" element={<CardProducts />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
};