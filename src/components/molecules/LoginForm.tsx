import React from "react";
import GoogleButton from "react-google-button";

const LoginForm: React.FC = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-4 p-6"
      onSubmit={e => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl font-bold text-orange-500">Iniciar sesión</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4 text-center">
        Accede a tu cuenta para gestionar tus mascotas.
      </p>
      <GoogleButton
        label="Continuar con Google"
        onClick={handleLogin}
        style={{ width: "100%" }}
      />
    </form>
  );
};

export default LoginForm;
