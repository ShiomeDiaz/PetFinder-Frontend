import axiosClient from "./axiosClient";
import { Pet } from "../types/pet";

// Tipado para respuesta paginada
export interface PaginatedPets {
  content: Pet[];
  totalPages: number;
  totalElements: number;
  number: number; // página actual (empieza en 0)
}

// Obtener mascotas (todas o filtradas por usuario) con paginación
export const getPets = async (
  page = 0,
  size = 4,
  email?: string
): Promise<PaginatedPets> => {
  if (email) {
    // Mascotas de usuario, paginadas
    const response = await axiosClient.get<PaginatedPets>("/pets/by-user", {
      params: { email, page, size },
    });
    return response.data;
  } else {
    // Todas las mascotas, paginadas
    const response = await axiosClient.get<PaginatedPets>("/pets", {
      params: { page, size },
    });
    return response.data;
  }
};

// Crear mascota
export const createPet = async (formData: FormData): Promise<Pet> => {
  const response = await axiosClient.post<Pet>("/pets/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Editar mascota
export const updatePet = async (id: string, formData: FormData): Promise<Pet> => {
  const response = await axiosClient.put<Pet>(`/pets/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
// Buscar mascotas por nombre, paginado
export const searchPets = async (name: string, page = 0, size = 4) => {
  const response = await axiosClient.get(`/pets/search`, {
    params: { name, page, size },
  });
  return response.data;
};


// Eliminar mascota
export const deletePet = async (id: string): Promise<void> => {
  await axiosClient.delete(`/pets/${id}`);
};
