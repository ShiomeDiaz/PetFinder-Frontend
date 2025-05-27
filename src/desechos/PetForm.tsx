// import React, { useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
// import { LatLngExpression, LeafletMouseEvent } from "leaflet";
// import { X } from "lucide-react";
// import "leaflet/dist/leaflet.css";

// interface PetFormProps {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (pet: any) => void;
//   initialData?: any;
// }

// const DEFAULT_POSITION: LatLngExpression = [4.570868, -74.297333];

// const PetForm: React.FC<PetFormProps> = ({
//   open,
//   onClose,
//   onSubmit,
//   initialData,
// }) => {
//   const [name, setName] = useState(initialData?.name || "");
//   const [description, setDescription] = useState(initialData?.description || "");
//   const [photo, setPhoto] = useState<File | null>(null);
//   const [isFound, setIsFound] = useState(initialData?.isFound || false);
//   const [markerPosition, setMarkerPosition] = useState<LatLngExpression>(
//     initialData?.latitude && initialData?.longitude
//       ? [initialData.latitude, initialData.longitude]
//       : DEFAULT_POSITION
//   );

//   function MapEvents() {
//     useMapEvents({
//       click: (e: LeafletMouseEvent) => {
//         setMarkerPosition([e.latlng.lat, e.latlng.lng]);
//       },
//     });
//     return null;
//   }

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!name || !description) return;

//     const petData = {
//       name,
//       description,
//       photo,
//       latitude: Array.isArray(markerPosition) ? markerPosition[0] : undefined,
//       longitude: Array.isArray(markerPosition) ? markerPosition[1] : undefined,
//       isFound,
//     };

//     onSubmit(petData);
//     onClose();
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div
//         className="
//           bg-white
//           rounded-2xl
//           shadow-2xl
//           shadow-orange-200
//           border-t-4 border-orange-400
//           w-full max-w-lg p-8 relative
//           animate-fade-in
//         "
//       >
//         {/* Botón de cierre */}
//         <button
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
//           onClick={onClose}
//           aria-label="Cerrar"
//           type="button"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         <h2 className="text-2xl font-extrabold text-orange-600 mb-6 text-center">
//           {initialData ? "Editar mascota" : "Agregar mascota"}
//         </h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium text-sidebar-foreground mb-1">
//               Nombre
//             </label>
//             <input
//               className="w-full px-3 py-2 border border-border rounded bg-background text-foreground"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               placeholder="Nombre de la mascota"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-sidebar-foreground mb-1">
//               Descripción
//             </label>
//             <input
//               className="w-full px-3 py-2 border border-border rounded bg-background text-foreground"
//               type="text"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//               placeholder="Descripción de la mascota"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-sidebar-foreground mb-1">
//               Foto
//             </label>
//             <input
//               className="w-full px-3 py-2 border border-border rounded bg-background text-foreground"
//               type="file"
//               accept="image/*"
//               onChange={(e) => setPhoto(e.target.files?.[0] || null)}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-sidebar-foreground mb-1">
//               Ubicación
//             </label>
//             <div className="rounded border border-border overflow-hidden" style={{ height: 200 }}>
//               <MapContainer
//                 center={markerPosition}
//                 zoom={13}
//                 style={{ height: "100%", width: "100%" }}
//               >
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <MapEvents />
//                 <Marker position={markerPosition}>
//                   <Popup>Ubicación de la mascota</Popup>
//                 </Marker>
//               </MapContainer>
//             </div>
//             <div className="text-xs text-muted-foreground mt-2">
//               Toca el mapa para seleccionar la ubicación.
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <input
//               id="isFound"
//               type="checkbox"
//               checked={isFound}
//               onChange={(e) => setIsFound(e.target.checked)}
//               className="accent-primary"
//             />
//             <label htmlFor="isFound" className="text-sm text-sidebar-foreground">
//               ¿Mascota encontrada?
//             </label>
//           </div>
//           <div className="flex justify-end gap-2 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded bg-muted text-foreground font-medium hover:bg-muted/80 transition"
//             >
//               Cancelar
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded bg-primary text-primary-foreground font-bold hover:bg-primary-dark transition"
//             >
//               {initialData ? "Guardar cambios" : "Agregar"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PetForm;
