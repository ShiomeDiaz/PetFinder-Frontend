// src/utils/geocode.ts
export async function getAddressFromLatLng(lat: number, lng: number): Promise<string> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
  );
  const data = await response.json();
  return data.display_name || "Dirección desconocida";
}
