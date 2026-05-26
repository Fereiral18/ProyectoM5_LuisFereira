import { Navigate, Outlet } from "react-router";
import { useAuthService } from "../hooks/useAuth";

export const AdminRoute = () => {
  const { user, loading } = useAuthService();

  if (loading) {
    return <h2>Cargando...</h2>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};