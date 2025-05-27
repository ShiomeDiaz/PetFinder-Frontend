import React from "react";
import MenuLink from "../atoms/MenuLink";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ReactElement; // <-- Cambiado aquí
}


interface MenuGroupProps {
  title: string;
  items: MenuItem[];
  collapsed: boolean;
}

const MenuGroup: React.FC<MenuGroupProps> = ({ title, items, collapsed }) => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div>
      <div className={`text-xs uppercase text-sidebar-foreground font-semibold mb-2 ${collapsed ? "text-center" : "text-left"}`}>
        {t(title, title)}
      </div>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.title}>
          <MenuLink
            to={item.url}
            icon={item.icon}
            isActive={location.pathname === item.url}
            collapsed={collapsed}
          >
            {t(item.title, item.title)}
          </MenuLink>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuGroup;
