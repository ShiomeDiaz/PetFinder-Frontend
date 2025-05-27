import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMapEvents } from "react-leaflet";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import FormLabel from "../atoms/FormLabel";
import "leaflet/dist/leaflet.css";
import { redIcon, blueIcon, greenIcon, formatDate } from "../../utils/mapUtils";
import { useTranslation } from "react-i18next";

interface Sighting {
  latitude: number;
  longitude: number;
  message: string;
  createdAt: string;
}

interface MapPickerProps {
  position: LatLngExpression;
  onPositionChange: (position: [number, number]) => void;
  sightings?: Sighting[];
  petLocation?: LatLngExpression;
  petUpdatedAt?: string;
  showLostMarker?: boolean; // <--- aquí la prop
}

const MapPickerEvents: React.FC<{ onPositionChange: (position: [number, number]) => void }> =
  ({ onPositionChange }) => {
    useMapEvents({
      click: (e: LeafletMouseEvent) => {
        onPositionChange([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

const MapPicker: React.FC<MapPickerProps> = ({
  position,
  onPositionChange,
  sightings = [],
  petLocation,
  petUpdatedAt,
  showLostMarker = false // default false
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <FormLabel>{t("location", "Ubicación")}</FormLabel>
      <div className="rounded border border-border overflow-hidden" style={{ height: 200 }}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapPickerEvents onPositionChange={onPositionChange} />

          {/* Marcador para la nueva ubicación (verde) */}
          <Marker position={position} icon={greenIcon}>
            <Popup>{t("new_sighting_here", "Nuevo avistamiento aquí")}</Popup>
            <Tooltip direction="top" offset={[0, -10]} sticky>
              {t("new_sighting_here", "Nuevo avistamiento aquí")}
            </Tooltip>
          </Marker>

          {/* Marcador rojo solo si showLostMarker es true */}
          {showLostMarker && petLocation && (
            <Marker position={petLocation} icon={redIcon}>
              <Popup>
                <b>{t("lost_place", "Lugar donde se perdió")}</b>
                <br />
                {formatDate(petUpdatedAt)}
              </Popup>
              <Tooltip direction="top" offset={[0, -10]} sticky>
                <b>{t("lost_place", "Lugar donde se perdió")}</b>
                <br />
                {formatDate(petUpdatedAt)}
              </Tooltip>
            </Marker>
          )}

          {/* Marcadores de avistamientos previos (azul) */}
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
      </div>
      <div className="text-xs text-muted-foreground mt-2">
        {t("tap_map_to_select_location", "Toca el mapa para seleccionar la ubicación.")}
      </div>
    </div>
  );
};

export default MapPicker;
