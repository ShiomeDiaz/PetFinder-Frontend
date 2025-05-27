import React, { useEffect, useState } from "react";
import { Home, Plus, Settings, PawPrint, LogIn, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarHeader from "../molecules/SidebarHeader";
import MenuGroup from "../molecules/MenuGroup";
import MenuLink from "../atoms/MenuLink";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();

  const [reportPetActive, setReportPetActive] = useState(false);

  useEffect(() => {
    const openHandler = () => setReportPetActive(true);
    const closeHandler = () => setReportPetActive(false);
    window.addEventListener("add-pet", openHandler);
    window.addEventListener("close-add-pet", closeHandler);
    return () => {
      window.removeEventListener("add-pet", openHandler);
      window.removeEventListener("close-add-pet", closeHandler);
    };
  }, []);

  const menuItems = [
    { title: t("home", "Inicio"), url: "/pets", icon: <Home className="w-5 h-5" /> },
    { title: t("my_pets", "Mis Mascotas"), url: "/myPets", icon: <PawPrint className="w-5 h-5" /> },
  ];

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, setMobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileOpen]);

  const sidebarWidth = collapsed ? "w-20" : "w-64";

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen
          bg-sidebar dark:bg-sidebar-dark
          border-r border-sidebar-border dark:border-sidebar-dark-border
          z-40 flex flex-col justify-between
          shadow-lg shadow-orange-200
          transition-all duration-300
          ${sidebarWidth}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          rounded-tr-2xl md:rounded-tr-none
        `}
      >
        <div>
          <SidebarHeader collapsed={collapsed} />
          <div className="px-2">
            <MenuGroup title={t("menu", "Menú")} items={menuItems} collapsed={collapsed} />
            <div className={`text-xs uppercase text-sidebar-foreground dark:text-sidebar-dark-foreground font-semibold mt-6 mb-2 ${collapsed ? "text-center" : "text-left"}`}>
              {t("actions", "Acciones")}
            </div>
            <MenuLink
              to="#"
              icon={
                <Plus
                  className={`w-5 h-5 transition-colors duration-200 ${
                    reportPetActive ? "text-orange-500" : "text-gray-500"
                  }`}
                />
              }
              isActive={reportPetActive}
              collapsed={collapsed}
              onClick={e => {
                e.preventDefault();
                if (!isAuthenticated) {
                  navigate("/login");
                  return;
                }
                window.dispatchEvent(new CustomEvent("add-pet"));
              }}
            >
              <span className="text-sidebar-foreground dark:text-sidebar-dark-foreground">{t("report_pet", "Reportar mascota")}</span>
            </MenuLink>
          </div>
        </div>
        <div className="px-2 pb-6">
          {!isAuthenticated ? (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className={`
                flex items-center gap-2 w-full px-4 py-2 rounded
                bg-sidebar dark:bg-sidebar-dark
                hover:bg-orange-50 dark:hover:bg-sidebar-accent
                transition
                text-orange-500 font-semibold
                mb-2
                ${collapsed ? "justify-center" : ""}
              `}
              style={{ border: "none", outline: "none" }}
            >
              <LogIn className="w-5 h-5 text-orange-500" />
              {!collapsed && <span>{t("login", "Iniciar sesión")}</span>}
            </button>
          ) : (
            <button
              type="button"
              onClick={logout}
              className={`
                flex items-center gap-2 w-full px-4 py-2 rounded
                bg-sidebar dark:bg-sidebar-dark
                hover:bg-red-50 dark:hover:bg-destructive
                transition
                text-red-600 font-semibold
                mb-2
                ${collapsed ? "justify-center" : ""}
              `}
              style={{ border: "none", outline: "none" }}
            >
              <LogOut className="w-5 h-5 text-red-600" />
              {!collapsed && <span>{t("logout", "Cerrar sesión")}</span>}
            </button>
          )}

          <MenuLink
            to="/ajustes"
            icon={<Settings className="w-5 h-5" />}
            isActive={location.pathname === "/ajustes"}
            collapsed={collapsed}
          >
            {t("settings", "Ajustes")}
          </MenuLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
