import React from "react";
import { Link } from "react-router-dom";

interface MenuLinkProps {
  to: string;
  icon: React.ReactElement;
  isActive: boolean;
  collapsed: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({
  to,
  icon,
  isActive,
  collapsed,
  children,
  onClick,
}) => {
  // Cast explícito para que TypeScript sepa que props existe
  const typedIcon = icon as React.ReactElement<any, any>;
  const coloredIcon = React.cloneElement(
    typedIcon,
    {
      className: `${typedIcon.props.className || ""} ${
        isActive ? "text-orange-500" : "text-gray-500"
      } transition-colors duration-200`
    }
  );

  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 px-4 py-2 rounded
        hover:bg-orange-50 transition
        font-semibold
        ${isActive ? "bg-orange-50" : ""}
        ${collapsed ? "justify-center" : ""}
      `}
      style={{ color: isActive ? undefined : "#6B7280" }}
      onClick={onClick}
      tabIndex={0}
    >
      {coloredIcon}
      {!collapsed && (
        <span className="transition-colors duration-200">
          {children}
        </span>
      )}
    </Link>
  );
};

export default MenuLink;
