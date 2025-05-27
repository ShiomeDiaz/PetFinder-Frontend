import React, { useState, useEffect } from "react";
import { LatLngExpression } from "leaflet";
import CloseButton from "../../atoms/CloseButton";
import FormField from "../../molecules/FormField";
import MapPicker from "../../molecules/MapPicker";
import ActionButtons from "../../molecules/ActionButtons";
import { getSightingsByPet } from "../../../api/sightingsApi";
import { useTranslation } from "react-i18next";

interface SightingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (sighting: any) => void;
  petLocation: LatLngExpression;
  petId: string;
  petUpdatedAt: string;
}

const SightingModal: React.FC<SightingModalProps> = ({
  open,
  onClose,
  onSubmit,
  petLocation,
  petId,
  petUpdatedAt,
}) => {
  const [message, setMessage] = useState("");
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression>(petLocation);
  const [sightings, setSightings] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      getSightingsByPet(petId).then(setSightings);
    }
  }, [open, petId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;

    const sightingData = {
      message,
      latitude: Array.isArray(markerPosition) ? markerPosition[0] : undefined,
      longitude: Array.isArray(markerPosition) ? markerPosition[1] : undefined,
    };
    onSubmit(sightingData);
    setMessage("");
    setMarkerPosition(petLocation);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl shadow-orange-200 border-t-4 border-orange-400 w-full max-w-lg p-8 relative animate-fade-in">
        <CloseButton onClick={onClose} />
        <h2 className="text-2xl font-extrabold text-orange-600 mb-6 text-center">
          {t("add_sighting", "Agregar avistamiento")}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormField
            label={t("message", "Mensaje")}
            id="sighting-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder={t("what_did_you_see", "¿Qué viste?")}
          />
          <MapPicker 
            position={markerPosition}
            onPositionChange={(pos) => setMarkerPosition(pos)}
            sightings={sightings}
            petLocation={petLocation}
            petUpdatedAt={petUpdatedAt}
          />
          <ActionButtons 
            onCancel={onClose}
            isEditing={false}
          />
        </form>
      </div>
    </div>
  );
};

export default SightingModal;
