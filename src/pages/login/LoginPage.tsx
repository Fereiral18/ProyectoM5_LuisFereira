import { AuthCard } from "../../components/form/AuthCard";

export const LoginPage = () => {
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
          placeholder: "tuemail@ejemplo.com"
        },
        {
          name: "password",
          label: "Contraseña",
          type: "password",
          placeholder: "••••••••"
        }
      ]}
      footerText="¿No tenés cuenta?"
      footerActionText={{
        text: "Registrate",
        onClick: () => console.log("ir a register")
      }}
      onSubmit={() => console.log("login")}
    />

      </div>
    </div>
  );
};