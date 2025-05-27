import axiosClient from "./axiosClient";

// Obtiene el email del usuario autenticado
export const getUserEmail = async (): Promise<string> => {
  const response = await axiosClient.get<{ email: string }>("/users/userEmail", {
    withCredentials: true,
  });
  return response.data.email;
};
