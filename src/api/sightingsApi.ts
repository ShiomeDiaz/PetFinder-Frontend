import axiosClient from "./axiosClient";

export const createSighting = async (data: {
  message: string;
  latitude: number;
  longitude: number;
  petId: string;
  userEmail: string;
}) => {
  const response = await axiosClient.post("/sightings/create_sight", data);
  return response.data;
};

export const getSightingsByPet = async (petId: string) => {
  const response = await axiosClient.get(`/sightings/sightings`, {
    params: { petId }
  });
  return response.data;
};