import React from "react";
import Button from "../atoms/Button";
import { useTranslation } from "react-i18next";

interface ActionButtonsProps {
  onCancel: () => void;
  isEditing: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCancel, isEditing }) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button type="button" onClick={onCancel}>
        {t("cancel", "Cancelar")}
      </Button>
      <Button type="submit" variant="primary">
        {isEditing ? t("save_changes", "Guardar cambios") : t("add", "Agregar")}
      </Button>
    </div>
  );
};

export default ActionButtons;
