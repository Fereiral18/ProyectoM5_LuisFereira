import { Navigate, Outlet } from "react-router-dom";
import { useAuthService } from "../hooks/useAuth";


export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { user, loading } = useAuthService();

  if (loading) return <p>Cargando...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};