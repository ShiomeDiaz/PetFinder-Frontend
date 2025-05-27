import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  icon?: React.ReactNode;
}
const Button: React.FC<ButtonProps> = ({ variant = "primary", icon, className, children, ...props }) => (
  <button
    className={`
      flex items-center gap-2 px-4 py-2 rounded font-semibold transition shadow-sm
      ${variant === "primary"
        ? "bg-primary hover:bg-primary-dark text-primary-foreground"
        : "border border-orange-200 bg-white hover:bg-orange-50 text-foreground"}
      ${className ?? ""}
    `}
    {...props}
  >
    {icon}
    {children}
  </button>
);
export default Button;
