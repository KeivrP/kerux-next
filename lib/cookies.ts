"use server";
import { cookies } from "next/headers";

// Función para guardar una cookie
export const setAuthTokenInCookies = (
  name: string,
  value: string,
  options?: object
) => {
  const cookieStore = cookies();
  cookieStore.set(name, value, options);
};

// Función para borrar una cookie
export const removeAuthTokenCookie = (name: string) => {
  const cookieStore = cookies();
  cookieStore.delete(name);
};

// Función para obtener el valor de una cookie
export const getAuthTokenFromCookies = (name: string) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);
  
  return cookie ? cookie.value : null; // Devuelve el valor de la cookie o null si no existe
};