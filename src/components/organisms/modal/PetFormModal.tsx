import React, { useState, useEffect } from "react";
import { LatLngExpression } from "leaflet";
import CloseButton from "../../atoms/CloseButton";
import FormField from "../../molecules/FormField";
import FormLabel from "../../atoms/FormLabel";
import MapPicker from "../../molecules/MapPicker";
import ActionButtons from "../../molecules/ActionButtons";
import { getSightingsByPet } from "../../../api/sightingsApi";
import { useTranslation } from "react-i18next";

interface PetFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (pet: any) => void;
  initialData?: any;
}

const DEFAULT_POSITION: LatLngExpression = [5.06889, -75.51738];

const PetFormModal: React.FC<PetFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [photo, setPhoto] = useState<File | null>(null);
  const [isFound, setIsFound] = useState(initialData?.found ?? false);
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression>(
    initialData?.latitude && initialData?.longitude
      ? [initialData.latitude, initialData.longitude]
      : DEFAULT_POSITION
  );
  const [sightings, setSightings] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (initialData && initialData.id) {
      getSightingsByPet(initialData.id).then(setSightings);
    }
  }, [initialData]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setIsFound(initialData.found ?? false);
      setMarkerPosition(
        initialData.latitude && initialData.longitude
          ? [initialData.latitude, initialData.longitude]
          : DEFAULT_POSITION
      );
    } else {
      setName("");
      setDescription("");
      setIsFound(false);
      setMarkerPosition(DEFAULT_POSITION);
      setSightings([]);
    }
    setPhoto(null);
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !description) return;

    const petData = {
      name,
      description,
      photo,
      latitude: Array.isArray(markerPosition) ? markerPosition[0] : undefined,
      longitude: Array.isArray(markerPosition) ? markerPosition[1] : undefined,
      isFound: initialData ? isFound : false,
    };

    onSubmit(petData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="
          bg-white
          rounded-2xl
          shadow-2xl
          shadow-orange-200
          border-t-4 border-orange-400
          w-full max-w-lg p-8 relative
          animate-fade-in
        "
      >
        <CloseButton onClick={onClose} />

        <h2 className="text-2xl font-extrabold text-orange-600 mb-6 text-center">
          {initialData ? t("edit_pet", "Editar mascota") : t("report_pet", "Reportar mascota")}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormField
            label={t("name", "Nombre")}
            id="pet-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder={t("pet_name_placeholder", "Nombre de la mascota")}
          />

          <FormField
            label={t("description", "Descripción")}
            id="pet-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder={t("pet_description_placeholder", "Descripción de la mascota")}
          />

          {/* Campo de foto traducido */}
          <div>
            <FormLabel htmlFor="pet-photo">{t("photo", "Foto")}</FormLabel>
            <input
              id="pet-photo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const files = (e.target as HTMLInputElement).files;
                if (files && files.length > 0) {
                  setPhoto(files[0]);
                }
              }}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-orange-50 file:text-orange-700
                hover:file:bg-orange-100"
            />
            {photo && (
              <div className="text-xs text-muted-foreground mt-1">
                {t("selected_photo", "Foto seleccionada")}: <span className="font-semibold">{photo.name}</span>
              </div>
            )}
          </div>
          <MapPicker
            position={markerPosition}
            onPositionChange={(pos) => setMarkerPosition(pos)}
            sightings={sightings}
            petLocation={
              initialData?.latitude && initialData?.longitude
                ? [initialData.latitude, initialData.longitude]
                : DEFAULT_POSITION
            }
            petUpdatedAt={initialData?.updatedAt}
            showLostMarker={!!initialData} // Solo mostrar marcador rojo si initialData existe
          />

          {initialData && (
            <div className="flex items-center gap-2">
              <input
                id="isFound"
                type="checkbox"
                checked={isFound}
                onChange={(e) => setIsFound(e.target.checked)}
                className="accent-primary"
              />
              <label htmlFor="isFound" className="text-sm text-sidebar-foreground">
                {t("pet_found", "¿Mascota encontrada?")}
              </label>
            </div>
          )}

          <ActionButtons
            onCancel={onClose}
            isEditing={!!initialData}
          />
        </form>
      </div>
    </div>
  );
};

export default PetFormModal;
