import React, { useState } from "react";
import { MapPin, Plus } from "lucide-react";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button2";
import { useReverseGeocode } from "../../utils/useReverseGeocode";
import SightingModal from "../organisms/modal/SightingModal";
import { createSighting } from "../../api/sightingsApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PetCardProps {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  updatedAt: string;
  photoUrl?: string;
  found: boolean;
  onLocation?: () => void;
  onEdit?: () => void;
}

const PetCard: React.FC<PetCardProps> = ({
  id,
  name,
  latitude,
  longitude,
  updatedAt,
  photoUrl,
  found,
}) => {
  const address = useReverseGeocode(latitude, longitude);
  const [showSightingModal, setShowSightingModal] = useState(false);
  const { isAuthenticated, userEmail } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleAddSighting = async (sightingData: any) => {
    if (!isAuthenticated) {
      alert(t("must_login_to_sighting", "Debes iniciar sesión para agregar un avistamiento."));
      navigate("/login");
      return;
    }
    const payload = {
      ...sightingData,
      petId: id,
      userEmail: userEmail || "",
    };
    await createSighting(payload);
  };

  const badgeColor = found ? "bg-green-500" : "bg-orange-400";
  const badgeText = found ? t("found", "Encontrado") : t("lost", "Perdido");

  const formattedDate = new Date(updatedAt).toLocaleString("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  });

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
          {t("last_seen", "Visto por última vez")}: <span className="font-semibold">{formattedDate}</span>
        </div>
        <div className="flex gap-2 mt-auto">
          <Button
            variant="outline"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowSightingModal(true)}
            disabled={found}
          >
            {t("add_sighting", "Agregar avistamiento")}
          </Button>
        </div>
      </div>
      <SightingModal
        open={showSightingModal}
        onClose={() => setShowSightingModal(false)}
        onSubmit={handleAddSighting}
        petLocation={[latitude, longitude]}
        petId={id}
        petUpdatedAt={updatedAt}
      />
    </div>
  );
};

export default PetCard;
