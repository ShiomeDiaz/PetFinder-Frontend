// src/types/Pet.ts
export interface Pet {
  [x: string]: any;
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  photoUrl?: string;
  found: boolean;
  updatedAt: string; // <-- Obligatorio
  // Puedes agregar createdAt, deletedAt si los usas
}
