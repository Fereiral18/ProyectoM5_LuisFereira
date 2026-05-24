import { Link } from "react-router";
import "./styles.css";
import { useAuthService } from "../hooks/useAuth";

export const Header = () => {
   const { user, logout } = useAuthService();
  return (
    <header className="nav-header">

      {/* PRIMERA FILA */}
      <div className="header-top">

        {/* LOGO */}
        <div className="logo">
          <Link to="/">ShopWave</Link>
        </div>

        {/* SEARCH */}
        <div className="search">
          <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
          />

          <button>🔍</button>
        </div>

        {/* PUBLICIDAD */}
        <div className="public">
          <div className="send">ENVÍO GRATIS</div>
          <div className="buy">En tu primera compra</div>
        </div>

      </div>

      {/* SEGUNDA FILA */}
      <div className="header-bottom">

        {/* FILTROS */}
        <div className="filter-container">
          <div className="filters">
            <button>Categorías</button>
            <button>Ofertas</button>
            <button>Ayuda</button>
          </div>
        </div>

        {/* USER OPTIONS */}
        <div className="users-option">

          <Link to="/products">
            Productos
          </Link>
{user ? (
          <>
            <span>{user.email}</span>
            <button
              onClick={() => (window.confirm("Logout?") ? logout() : null)}
            >
              Logout
            </button>
          </>
        ) : (
          <>
             <Link
            to="/login"
            className="login-link"
          >
            Ingresar
          </Link>

          <Link
            to="/register"
            className="register-btn"
          >
            Registro
          </Link>
          </>
        )}
         

        </div>

      </div>

    </header>
  );
};