import { Route, Routes } from "react-router"
import { HomePage } from "../pages/Home/HomePage"
import { ProductPage } from "../pages/ProductPage"
import { RegisterPage } from "../pages/Register/RegisterPage"
import { LoginPage } from "../pages/login/LoginPage"
import { Layout } from "../components/Layout"

export const AppRouters = () => {
  return (
    <Routes >
      <Route element={<Layout/>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}
