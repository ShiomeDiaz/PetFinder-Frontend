import { useEffect, useState } from "react";

function formatShortAddress(address: any): string {
  // Puedes ajustar el orden y los campos según lo que quieras mostrar
  return [
    address.road || address.hamlet,
    address.neighbourhood || address.suburb,
    address.city,
    address.state || address.region
  ].filter(Boolean).join(", ");
}

export function useReverseGeocode(lat: number, lng: number) {
  const [address, setAddress] = useState<string>("Cargando dirección...");

  useEffect(() => {
    if (lat && lng) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.address) {
            setAddress(formatShortAddress(data.address));
          } else {
            setAddress("Dirección desconocida");
          }
        })
        .catch(() => setAddress("Dirección desconocida"));
    }
  }, [lat, lng]);

  return address;
}
