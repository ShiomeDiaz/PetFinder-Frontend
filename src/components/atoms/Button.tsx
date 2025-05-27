import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = "secondary", 
  children,
  className = "",
  ...props 
}) => (
  <button
    className={`
      px-4 py-2 rounded font-medium transition
      ${variant === "primary" 
        ? "bg-primary text-primary-foreground font-bold hover:bg-primary-dark" 
        : "bg-muted text-foreground hover:bg-muted/80"}
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export default Button;
