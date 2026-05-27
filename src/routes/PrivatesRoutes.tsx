import { Navigate, Outlet } from "react-router-dom";
import { useAuthService } from "../hooks/useAuth";


export const ProtectedRoute = () => {
  const { user, loading } = useAuthService();

  //* 1. LOADING:
  if (loading) {
    return <h2>Cargando productos...</h2>;
  }

  //* 2. USER:
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};