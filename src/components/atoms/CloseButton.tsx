import React from "react";
import { X } from "lucide-react";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => (
  <button
    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
    onClick={onClick}
    aria-label="Cerrar"
    type="button"
  >
    <X className="w-6 h-6" />
  </button>
);

export default CloseButton;
