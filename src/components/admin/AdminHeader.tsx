import { Link, useNavigate } from "react-router-dom";
import { useAuthService } from "../../hooks/useAuth";
import "./style.css";

export const AdminSidebar = () => {
  const { user, logout } = useAuthService();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!window.confirm("¿Cerrar sesión?")) return;

    await logout();
    navigate("/");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <Link to="/admin/dashboard">Admin Panel</Link>
      </div>

      <nav className="admin-menu">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/products">Productos</Link>
        <Link to="/admin/products/create">Crear Producto</Link>
      </nav>

      <div className="admin-footer">
        <span className="admin-user">{user?.email}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </aside>
  );
};