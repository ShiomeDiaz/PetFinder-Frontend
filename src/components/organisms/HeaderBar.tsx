import React from "react";
import { PanelLeft } from "lucide-react";
import IconButton from "../atoms/IconButton";

interface HeaderBarProps {
  onToggleSidebar: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onToggleSidebar }) => (
  <header
    className="
      flex items-center h-10 px-4
      bg-gradient-to-r from-orange-50/50 to-white/80
      backdrop-blur
      shadow-none
      border-none
      transition
      z-50
    "
    style={{
      boxShadow: "0 1px 0 0 rgba(251,146,60,0.05)"
    }}
  >
    <IconButton
      icon={<PanelLeft className="w-5 h-5" />}
      onClick={onToggleSidebar}
      aria-label="Abrir/cerrar menú"
      className="mr-2"
    />
    {/* El título va en el bloque de contenido, no aquí */}
  </header>
);

export default HeaderBar;
