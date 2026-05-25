import { useState } from "react";
import { useNavigate } from "react-router";

import { AuthCard } from "../../components/form/AuthCard";
import { useAuthService } from "../../hooks/useAuth";

export const LoginPage = () => {

  const navigate = useNavigate();

  const { login } = useAuthService();

  //* NUEVO ESTADO
  const [serverError, setServerError] = useState("");

  const handleLogin = async (values) => {

    //* limpiamos error anterior
    setServerError("");

    try {

      await login(values.email, values.password);

      navigate("/");

    } catch (error) {

      //* guardamos el error para mostrarlo en UI
      if (error instanceof Error) {
        setServerError(error.message);
      }
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-hero">

          <span className="login-badge">
            Bienvenido de vuelta
          </span>

          <h1>
            Iniciá sesión en tu <span>tienda favorita</span>
          </h1>

          <p>
            Accedé a tu cuenta para ver productos,
            pedidos y ofertas exclusivas.
          </p>

        </div>

        <AuthCard
          title="Iniciar sesión"
          buttonText="Entrar"
          onSubmit={handleLogin}

          //* NUEVA PROP
          serverError={serverError}

          fields={[
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "tuemail@gmail.com"
            },
            {
              name: "password",
              label: "Contraseña",
              type: "password",
              placeholder: "••••••••"
            }
          ]}
        />

      </div>
    </div>
  );
};