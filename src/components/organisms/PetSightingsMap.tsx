import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { getSightingsByPet } from "../../api/sightingsApi";
import { redIcon, blueIcon, formatDate } from "../../utils/mapUtils";
import { useTranslation } from "react-i18next";

interface PetSightingsMapProps {
  petId: string;
  initialPosition: [number, number];
  petUpdatedAt: string;
}

const PetSightingsMap: React.FC<PetSightingsMapProps> = ({
  petId,
  initialPosition,
  petUpdatedAt,
}) => {
  const [sightings, setSightings] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getSightingsByPet(petId).then(setSightings);
  }, [petId]);

  return (
    <MapContainer center={initialPosition} zoom={14} style={{ height: 400, width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marcador de ubicación original en rojo */}
      <Marker position={initialPosition} icon={redIcon}>
        <Popup>
          <b>{t("lost_place")}</b>
          <br />
          {formatDate(petUpdatedAt)}
        </Popup>
        <Tooltip direction="top" offset={[0, -10]} sticky>
          <b>{t("lost_place")}</b>
          <br />
          {formatDate(petUpdatedAt)}
        </Tooltip>
      </Marker>

      {/* Marcadores de avistamientos en azul */}
      {sightings.map((s, idx) => (
        <Marker key={idx} position={[s.latitude, s.longitude]} icon={blueIcon}>
          <Popup>
            <b>{s.message}</b>
            <br />
            {formatDate(s.createdAt)}
          </Popup>
          <Tooltip direction="top" offset={[0, -10]} sticky>
            <b>{s.message}</b>
            <br />
            {formatDate(s.createdAt)}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default PetSightingsMap;
