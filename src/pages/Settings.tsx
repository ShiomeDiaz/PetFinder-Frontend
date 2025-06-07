import React, { useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
];

const Settings: React.FC = () => {
  const { userEmail, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "es"
  );

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setLanguage(lang);
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white dark:bg-gray-900 rounded-xl shadow p-8 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">{t("settings")}</h2>

      {/* Información del usuario */}
      {userEmail && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div>
              <div className="font-semibold">{userEmail}</div>
            </div>
          </div>
        </div>
      )}

      {/* Cambiar tema */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-medium">{t("Modo Oscuro")}</span>
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded transition ${
            darkMode
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {darkMode ? t("deactivate") : t("activate")}
        </button>
      </div>

      {/* Cambiar idioma */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-medium">{t("Lenguaje")}</span>
        <select
          value={language}
          onChange={handleChangeLanguage}
          className="px-3 py-2 rounded border bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Cerrar sesión */}
      <button
        onClick={logout}
        className="w-full py-2 mt-4 rounded bg-red-500 hover:bg-red-600 text-white font-semibold transition"
      >
        {t("logout")}
      </button>

      {/* Acerca de */}
      <div className="mt-8 text-center text-xs text-gray-400">
        PetFinder v1.0 &mdash; {t("about")} 🐾<br />
        <a
          href="mailto:soporte@petfinder.com"
          className="underline hover:text-orange-500"
        >
          {t("contact")}
        </a>
      </div>
    </div>
  );
};

export default Settings;
