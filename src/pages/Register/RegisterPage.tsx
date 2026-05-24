import { AuthCard } from "../../components/form/AuthCard";


export const RegisterPage = () => {
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
        onClick: () => console.log("ir a login")
      }}
      onSubmit={() => console.log("register")}
    />
    </div>
    </div>
  );
};