import React from "react";
import FormLabel from "../atoms/FormLabel";
import FormInput from "../atoms/FormInput";
import { useTranslation } from "react-i18next";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <FormLabel htmlFor={id}>{t(label, label)}</FormLabel>
      <FormInput
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder ? t(placeholder, placeholder) : undefined}
      />
    </div>
  );
};

export default FormField;
