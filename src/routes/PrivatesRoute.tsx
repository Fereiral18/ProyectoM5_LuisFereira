import { Navigate, Outlet } from "react-router-dom";
import { useAuthService } from "../hooks/useAuth";
import type { Props } from "../types/auth.type";


export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { user, loading } = useAuthService();


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};