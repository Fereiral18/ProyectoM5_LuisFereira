import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

import { useAuthService } from "../hooks/useAuth";
import { useProducts } from "../hooks/useProducts";

import { useState } from "react";

import { CartWidget } from "./CartWidget";

export const Header = () => {
  const { user, logout } = useAuthService();

  const { search, setSearch } = useProducts();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

 
  const handleSelect = (category: string) => {
    setOpen(false);

    navigate(`/products?category=${category}`);
  };
console.log(search)
 
  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "¿Estás seguro de cerrar sesión?"
    );

    if (!confirmLogout) return;

    await logout();

    navigate("/login");
  };

  return (
    <header className="nav-header">

      {/* =========================
          TOP HEADER
      ========================== */}
      <div className="header-top">

        {/* LOGO */}
        <div className="logo">
          <Link to="/">ShoppING</Link>
        </div>

        {/* SEARCH */}
        <div className="search">
          <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="button">🔍</button>
        </div>

        {/* PUBLICIDAD */}
        <div className="public">
          <div className="send">ENVÍO GRATIS</div>

          <div className="buy">
            En tu primera compra
          </div>
        </div>
      </div>

      {/* =========================
          BOTTOM HEADER
      ========================== */}
      <div className="header-bottom">

        {/* FILTROS */}
        <div className="filter-container">
          <div className="filters">

            <div className="categories-wrapper">

              <button
                type="button"
                onClick={() => setOpen(!open)}
              >
                Categorías
              </button>

              {open && (
                <div className="dropdown">

                  <button
                    type="button"
                    onClick={() =>
                      handleSelect("Tecnologia")
                    }
                  >
                    Tecnología
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleSelect("Audio")
                    }
                  >
                    Audio
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleSelect("Accesorios")
                    }
                  >
                    Accesorios
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleSelect("Moda")
                    }
                  >
                    Moda
                  </button>

                </div>
              )}
            </div>

            <button type="button">
              Ayuda
            </button>

          </div>
        </div>

        {/* USER OPTIONS */}
        <div className="users-option">

          <Link to="/products">
            Productos
          </Link>

          {/* SOLO ADMIN */}
          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="admin-link"
            >
              Admin Panel
            </Link>
          )}

          {user ? (
            <div className="user-session">

              <span className="user-email">
                {user.email}
              </span>

              <CartWidget />

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
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