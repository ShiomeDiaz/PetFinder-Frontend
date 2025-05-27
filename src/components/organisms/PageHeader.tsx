import React from "react";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PageHeaderProps {
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-xl shadow-lg shadow-orange-100 bg-gradient-to-r from-orange-50/80 to-white/90 dark:from-sidebar-dark dark:to-sidebar-dark p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-extrabold text-foreground dark:text-foreground-dark mb-1">
          {t("lost_pets", "Mascotas Perdidas")}
        </h1>
        <div className="flex items-center gap-2 text-gray-600 dark:text-sidebar-dark-foreground font-medium">
          <MapPin className="w-5 h-5 text-orange-500" />
          <span>
            {t("find_lost_pets_near_you", "Encuentra mascotas perdidas cerca de ti")}
          </span>
        </div>
      </div>
      {children && (
        <div className="w-full sm:w-auto flex justify-end">{children}</div>
      )}
    </div>
  );
};

export default PageHeader;
