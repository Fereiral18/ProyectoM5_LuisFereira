import { Route, Routes } from "react-router-dom";

import { HomePage } from "../pages/Home/HomePage";
import { RegisterPage } from "../pages/Register/RegisterPage";
import { LoginPage } from "../pages/login/LoginPage";

import { Layout } from "../components/Layout";

import { ProtectedRoute } from "./PrivatesRoutes";
import { AdminRoute } from "./AdminRoutes";

import { ProductPage } from "../pages/Products/ProductPage";
import { CardProducts } from "../pages/Products/CardProducts";

import { AdminPage } from "../pages/admin/adminPage/AdminPage";
import ProductFormPage from "../pages/admin/ProductsFormPage/ProductFormPage";
import { AdminProductsPage } from "../pages/admin/adminProductPage/AdminProductPage";
import { EditProductPage } from "../pages/admin/EditProductPage/EditProductPage";
import { AdminLayout } from "../components/admin/AdminLayout";

export const AppRouters = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />

        <Route path="/products" element={<ProductPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        {/* USER */}
        <Route element={<ProtectedRoute />}>
          <Route path="/products/:id" element={<CardProducts />} />
        </Route>
          </Route>

        {/* ADMIN */}

        <Route element={<AdminRoute />}>
        <Route element={<AdminLayout/>}>
          <Route path="/admin/dashboard" element={<AdminPage />} />

          <Route path="/admin/products" element={<AdminProductsPage />} />

          <Route path="/admin/products/create" element={<ProductFormPage />} />

          <Route
            path="/admin/products/edit/:id"
            element={<EditProductPage />}
            />
        </Route>
        </Route>
    </Routes>
  );
};
