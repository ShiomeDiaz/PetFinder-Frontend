import React from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  collapsed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, collapsed, onClick, children }) => (
  <button
    type="button"
    className={`
      flex items-center ${collapsed ? "justify-center" : "gap-2"} px-3 py-2 rounded-md w-full bg-sidebar-accent text-sidebar-accent-foreground hover:bg-primary hover:text-primary-foreground transition font-medium
      shadow shadow-orange-100
    `}
    onClick={onClick}
  >
    {icon}
    {!collapsed && <span>{children}</span>}
  </button>
);

export default ActionButton;
