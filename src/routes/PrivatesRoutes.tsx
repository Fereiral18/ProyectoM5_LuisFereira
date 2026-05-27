import { Navigate, Outlet } from "react-router-dom";
import { useAuthService } from "../hooks/useAuth";

type Role = "admin" | "customer";

interface ProtectedRouteProps {
  allowedRoles?: Role[];
}

export const ProtectedRoute = ({
  allowedRoles,
}: ProtectedRouteProps) => {
  const { user, loading } = useAuthService();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // VALIDAR ROLES
  if (allowedRoles && !allowedRoles.includes(user.role as Role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};