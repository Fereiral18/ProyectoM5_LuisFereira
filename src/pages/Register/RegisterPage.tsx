import { useNavigate } from "react-router";
import { AuthCard } from "../../components/form/AuthCard";
import { useAuthService } from "../../hooks/useAuth";


export const RegisterPage = () => {
    const { register } = useAuthService();
  const navigate = useNavigate();
  const handleRegister = async (values) => {
    try {
      const userCredential = await register(
        values.email,
        values.password
      );

      console.log("REGISTER OK:", userCredential.user);
    } catch (error) {
      console.log("ERROR REGISTER:", error.message);
    }
  };

  return (
     <div className="login-page">
      <div className="login-container">

        {/* LEFT SIDE (branding) */}
        <div className="login-hero">
          <span className="login-badge">Bienvenido</span>

          <h1>
            Crea una cuenta en tu <span>tienda favorita</span>
          </h1>

          <p>
            Crea una cuenta en segundos para ver productos, pedidos y ofertas exclusivas.
          </p>
        </div>
    <AuthCard
      title="Crear cuenta"
      buttonText="Registrarme"
      fields={[
        {
          name: "name",
          label: "Nombre",
          type: "text",
          placeholder: "Tu nombre"
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "tuemail@ejemplo.com"
        },
        {
          name: "password",
          label: "Contraseña",
          type: "password",
          placeholder: "••••••••"
        }
      ]}
      footerText="¿Ya tenés cuenta?"
      footerActionText={{
        text: "Iniciar sesión",
        onClick: () => navigate("/login")
      }}
    onSubmit={handleRegister}
    />
    </div>
    </div>
  );
};