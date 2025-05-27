import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Propiedades específicas si las hay
}

const FormInput: React.FC<FormInputProps> = ({ className, ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-border rounded bg-background text-foreground ${className || ""}`}
    {...props}
  />
);

export default FormInput;
