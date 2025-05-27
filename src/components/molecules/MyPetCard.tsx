import React from "react";
import { Edit, MapPin } from "lucide-react";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button2";
import { useReverseGeocode } from "../../utils/useReverseGeocode";
import { useTranslation } from "react-i18next";

interface MyPetCardProps {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  updatedAt: string;
  photoUrl?: string;
  found: boolean;
  onEdit: () => void;
}

const MyPetCard: React.FC<MyPetCardProps> = ({
  name,
  latitude,
  longitude,
  updatedAt,
  photoUrl,
  onEdit,
  found,
}) => {
  const { t } = useTranslation();
  const address = useReverseGeocode(latitude, longitude);

  const formattedDate = new Date(updatedAt).toLocaleString("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const badgeColor = found ? "bg-green-500" : "bg-orange-400";
  const badgeText = found ? t("found", "Encontrado") : t("lost", "Perdido");

  return (
    <div className="relative bg-card rounded-xl border border-border border-t-4 border-t-orange-400 overflow-hidden flex flex-col shadow-[-2px_12px_25px_-1px_rgba(0,0,0,0.75)]">
      <Badge className={`${badgeColor} text-white absolute top-4 right-4 z-10`}>
        {badgeText}
      </Badge>
      <img
        src={photoUrl || "https://placehold.co/80"}
        alt={name}
        className="object-cover w-full h-64"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "https://placehold.co/80";
        }}
      />
      <div className="p-5 flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-foreground">{name}</h2>
        <div className="flex items-center text-gray-700 text-sm mb-1 gap-1">
          <MapPin className="w-4 h-4 text-orange-500" />
          {address}
        </div>
        <div className="text-xs text-muted-foreground mb-4">
          {t("last_update", "Última actualización")}: <span className="font-semibold">{formattedDate}</span>
        </div>
        <div className="flex gap-2 mt-auto">
          <Button
            variant="outline"
            icon={<Edit className="w-4 h-4" />}
            onClick={onEdit}
          >
            {t("edit_pet", "Editar mascota")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyPetCard;
