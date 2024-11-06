import {
  API_URL_COMP,
  API_URL_CONT,
  API_URL_DOC,
  API_URL_ING,
  API_URL_LOG,
  API_URL_PROSEG,
} from "@/constants/env.constant";
import { getAuthTokenFromCookies, removeAuthTokenCookie } from "@/lib/cookies";
import axios from "axios";

export const Api_Proseg = axios.create({
  baseURL: API_URL_PROSEG,
});
export const Api_Log = axios.create({
  baseURL: API_URL_LOG,
});
export const Api_Comp = axios.create({
  baseURL: API_URL_COMP,
});
export const Api_Doc = axios.create({
  baseURL: API_URL_DOC,
});
export const Api_Cont = axios.create({
  baseURL: API_URL_CONT,
});
export const Api_Ing = axios.create({
  baseURL: API_URL_ING,
});
export const ApiLogin = axios.create({
  baseURL: API_URL_PROSEG,
});

Api_Proseg.interceptors.request.use(async (config) => {
  const token = await getAuthTokenFromCookies("email");
  const email = await getAuthTokenFromCookies("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (email) {
    config.headers["Auth-User"] = email;
  }

  return config;
});

// Agrega un interceptor para todas las respuestas
Api_Proseg.interceptors.response.use(
  (response) => {
    // Si la respuesta fue exitosa, simplemente la devolvemos
    return response;
  },
  (error) => {
    // Si hubo un error, lo verificamos
    if (error.response && error.response.status === 401) {
      // Aquí puedes manejar el error 401 como prefieras
      // Por ejemplo, podrías redirigir al usuario a la página de inicio de sesión
      console.log("Error 401: No autorizado");
      removeAuthTokenCookie("token");
      removeAuthTokenCookie("email");
      removeAuthTokenCookie("authjs.session-token");
      // Maneja el cierre de sesión directamente aquí
    }

    // Si quieres seguir lanzando el error después de manejarlo, asegúrate de devolver un Promise rechazado
    return Promise.reject(error);
  }
);
Api_Log.interceptors.request.use(async (config) => {
   const token = await getAuthTokenFromCookies("email");
  const email = await getAuthTokenFromCookies("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (email) {
    config.headers["Auth-User"] = email;
  }

  return config;
});

// Agrega un interceptor para todas las respuestas
Api_Log.interceptors.response.use(
  (response) => {
    // Si la respuesta fue exitosa, simplemente la devolvemos
    return response;
  },
  (error) => {
    // Si hubo un error, lo verificamos
    if (error.response && error.response.status === 401) {
      // Aquí puedes manejar el error 401 como prefieras
      // Por ejemplo, podrías redirigir al usuario a la página de inicio de sesión
      console.log("Error 401: No autorizado");
      removeAuthTokenCookie("token");
      removeAuthTokenCookie("email");
      removeAuthTokenCookie("authjs.session-token");
      // Maneja el cierre de sesión directamente aquí
    }

    // Si quieres seguir lanzando el error después de manejarlo, asegúrate de devolver un Promise rechazado
    return Promise.reject(error);
  }
);
Api_Comp.interceptors.request.use(async (config) => {
   const token = await getAuthTokenFromCookies("email");
  const email = await getAuthTokenFromCookies("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (email) {
    config.headers["Auth-User"] = email;
  }

  return config;
});

// Agrega un interceptor para todas las respuestas
Api_Comp.interceptors.response.use(
  (response) => {
    // Si la respuesta fue exitosa, simplemente la devolvemos
    return response;
  },
  (error) => {
    // Si hubo un error, lo verificamos
    if (error.response && error.response.status === 401) {
      // Aquí puedes manejar el error 401 como prefieras
      // Por ejemplo, podrías redirigir al usuario a la página de inicio de sesión
      console.log("Error 401: No autorizado");
      removeAuthTokenCookie("token");
      removeAuthTokenCookie("email");
      removeAuthTokenCookie("authjs.session-token");
      // Maneja el cierre de sesión directamente aquí
    }

    // Si quieres seguir lanzando el error después de manejarlo, asegúrate de devolver un Promise rechazado
    return Promise.reject(error);
  }
);
Api_Doc.interceptors.request.use(async (config) => {
   const token = await getAuthTokenFromCookies("email");
  const email = await getAuthTokenFromCookies("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (email) {
    config.headers["Auth-User"] = email;
  }

  return config;
});

// Agrega un interceptor para todas las respuestas
Api_Doc.interceptors.response.use(
  (response) => {
    // Si la respuesta fue exitosa, simplemente la devolvemos
    return response;
  },
  (error) => {
    // Si hubo un error, lo verificamos
    if (error.response && error.response.status === 401) {
      // Aquí puedes manejar el error 401 como prefieras
      // Por ejemplo, podrías redirigir al usuario a la página de inicio de sesión
      console.log("Error 401: No autorizado");
      removeAuthTokenCookie("token");
      removeAuthTokenCookie("email");
      removeAuthTokenCookie("authjs.session-token");
      // Maneja el cierre de sesión directamente aquí
    }

    // Si quieres seguir lanzando el error después de manejarlo, asegúrate de devolver un Promise rechazado
    return Promise.reject(error);
  }
);

Api_Doc.interceptors.request.use(async (config) => {
   const token = await getAuthTokenFromCookies("email");
  const email = await getAuthTokenFromCookies("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (email) {
    config.headers["Auth-User"] = email;
  }

  return config;
});

// Agrega un interceptor para todas las respuestas
Api_Doc.interceptors.response.use(
  (response) => {
    // Si la respuesta fue exitosa, simplemente la devolvemos
    return response;
  },
  (error) => {
    // Si hubo un error, lo verificamos
    if (error.response && error.response.status === 401) {
      // Aquí puedes manejar el error 401 como prefieras
      // Por ejemplo, podrías redirigir al usuario a la página de inicio de sesión
      console.log("Error 401: No autorizado");
      removeAuthTokenCookie("token");
      removeAuthTokenCookie("email");
      removeAuthTokenCookie("authjs.session-token");
      // Maneja el cierre de sesión directamente aquí
    }

    // Si quieres seguir lanzando el error después de manejarlo, asegúrate de devolver un Promise rechazado
    return Promise.reject(error);
  }
);

Api_Ing.interceptors.request.use(async (config) => {
   const token = await getAuthTokenFromCookies("email");
  const email = await getAuthTokenFromCookies("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (email) {
    config.headers["Auth-User"] = email;
  }

  return config;
});

// Agrega un interceptor para todas las respuestas
Api_Ing.interceptors.response.use(
  (response) => {
    // Si la respuesta fue exitosa, simplemente la devolvemos
    return response;
  },
  (error) => {
    // Si hubo un error, lo verificamos
    if (error.response && error.response.status === 401) {
      // Aquí puedes manejar el error 401 como prefieras
      // Por ejemplo, podrías redirigir al usuario a la página de inicio de sesión
      console.log("Error 401: No autorizado");
      removeAuthTokenCookie("token");
      removeAuthTokenCookie("email");
      removeAuthTokenCookie("authjs.session-token");
      // Maneja el cierre de sesión directamente aquí
    }

    // Si quieres seguir lanzando el error después de manejarlo, asegúrate de devolver un Promise rechazado
    return Promise.reject(error);
  }
);
