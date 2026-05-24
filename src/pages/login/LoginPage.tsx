import { useNavigate } from "react-router";
import { AuthCard } from "../../components/form/AuthCard";
import { useAuthService } from "../../hooks/useAuth";


export const LoginPage = () => {

    const navigate = useNavigate()
    const { login } = useAuthService();
  const handleLogin = async (values) => {
    try {
        await login(values.email, values.password);
      navigate("/");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* LEFT SIDE (branding) */}
        <div className="login-hero">
          <span className="login-badge">Bienvenido de vuelta</span>

          <h1>
            Iniciá sesión en tu <span>tienda favorita</span>
          </h1>

          <p>
            Accedé a tu cuenta para ver productos, pedidos y ofertas exclusivas.
          </p>
        </div>

     <AuthCard
      title="Iniciar sesión"
      buttonText="Entrar"
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
      onSubmit={handleLogin}
    />

      </div>
    </div>
  );
};