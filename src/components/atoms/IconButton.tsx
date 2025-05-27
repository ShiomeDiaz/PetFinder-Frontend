import React from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, className, ...props }) => (
  <button
    className={`
      p-2 rounded
      hover:bg-orange-50/60
      active:bg-orange-100
      transition
      text-gray-500
      ${className ?? ""}
    `}
    {...props}
  >
    {icon}
  </button>
);

export default IconButton;
