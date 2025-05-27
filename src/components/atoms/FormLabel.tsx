import React from "react";

interface FormLabelProps {
  htmlFor?: string;
  children: React.ReactNode;
}

const FormLabel: React.FC<FormLabelProps> = ({ htmlFor, children }) => (
  <label 
    htmlFor={htmlFor} 
    className="block text-sm font-medium text-sidebar-foreground mb-1"
  >
    {children}
  </label>
);

export default FormLabel;
