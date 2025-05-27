import React from "react";
import { useAuth } from "../components/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GOOGLE_LOGO = "https://developers.google.com/identity/images/g-logo.png";
const GOOGLE_LOGO_FALLBACK = "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg";

const LoginPage: React.FC = () => {
  const { isAuthenticated, loading, login } = useAuth();
  const { t } = useTranslation();

  if (loading) return <div>{t("loading", "Cargando...")}</div>;
  if (isAuthenticated) return <Navigate to="/pets" replace />;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #fff7ed 0%, #fff 100%)"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "1.5rem",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        padding: "3rem 2rem",
        maxWidth: 400,
        width: "100%",
        textAlign: "center"
      }}>
        <h2 style={{ fontWeight: 800, marginBottom: 16 }}>{t("login_title", "Iniciar sesión")}</h2>
        <p style={{ marginBottom: 32 }}>
          {t("login_subtitle", "Accede a tu cuenta para gestionar tus mascotas.")}
        </p>
        <button
          onClick={login}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#fb923c",
            color: "#fff",
            fontWeight: 600,
            fontSize: 18,
            border: "none",
            borderRadius: 8,
            padding: "12px 24px",
            cursor: "pointer",
            width: "100%",
            justifyContent: "center"
          }}
        >
          <img
            src={GOOGLE_LOGO}
            alt="Google"
            style={{
              width: 28,
              height: 28,
              background: "#fff",
              borderRadius: "50%",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
            }}
            onError={e => {
              (e.currentTarget as HTMLImageElement).src = GOOGLE_LOGO_FALLBACK;
            }}
          />
          {t("continue_with_google", "Continuar con Google")}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
