import React from "react";
import { useTranslation } from "react-i18next";

interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed }) => {
  const { t } = useTranslation();
  return (
    <div className={`px-4 pt-8 pb-4 flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
      <span className={`font-extrabold text-sidebar-primary transition-all duration-300 ${collapsed ? "text-xl" : "text-2xl"}`}>
        {collapsed ? "🐾" : t("app_title", "LPTracker")}
      </span>
    </div>
  );
};

export default SidebarHeader;
