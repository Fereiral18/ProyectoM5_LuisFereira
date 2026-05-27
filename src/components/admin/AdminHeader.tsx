import { Link, useNavigate } from "react-router-dom";
import { useAuthService } from "../../hooks/useAuth";

import "./style.css";

export const AdminHeader = () => {
	const { user, logout } =
		useAuthService();

	const navigate =
		useNavigate();

	const handleLogout =
		async () => {
			const confirmLogout =
				window.confirm(
					"¿Cerrar sesión?"
				);

			if (!confirmLogout)
				return;

			await logout();

			navigate("/");
		};

	return (
		<header className="admin-header">
			<div className="admin-logo">
				<Link to="/admin/dashboard">
					Admin Panel
				</Link>
			</div>

			<nav className="admin-nav">
				<Link to="/admin/dashboard">
					Dashboard
				</Link>

				<Link to="/admin/products">
					Productos
				</Link>

				<Link to="/admin/products/create">
					Crear Producto
				</Link>
			</nav>

			<div className="admin-user">
				<span>
					{user?.email}
				</span>

				<button
					onClick={
						handleLogout
					}
				>
					Logout
				</button>
			</div>
		</header>
	);
};