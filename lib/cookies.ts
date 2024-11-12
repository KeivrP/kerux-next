"use server";
import { cookies } from "next/headers";

// Función para guardar una cookie
export async function setAuthTokenInCookies(
  name: string,
  value: string,
  options?: object
) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, options);
}

// Función para borrar una cookie
export async function removeAuthTokenCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

// Función para obtener el valor de una cookie
export async function getAuthTokenFromCookies(name: string) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  
  return cookie ? cookie.value : null;
}