import {
  API_URL_COMP,
  API_URL_CONT,
  API_URL_DOC,
  API_URL_ING,
  API_URL_LOG,
  API_URL_PROSEG,
} from "@/constants/env.constant";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { removeAuthTokenCookie } from "@/lib/cookies";
import { getAuthHeaders } from "./session/headers";

const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config: any) => {
      const newHeaders = await getAuthHeaders();
      config.headers = { ...config.headers, ...newHeaders };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log("Error 401: No autorizado");
        // Handle logout here if necessary
        removeAuthTokenCookie("token");
        removeAuthTokenCookie("email");
        removeAuthTokenCookie("authjs.session-token");
      }
      return Promise.reject(error);
    }
  );
};

// Create Axios instances
export const Api_Proseg: AxiosInstance = axios.create({
  baseURL: API_URL_PROSEG,
});

export const Api_Log: AxiosInstance = axios.create({
  baseURL: API_URL_LOG,
});

export const Api_Comp: AxiosInstance = axios.create({
  baseURL: API_URL_COMP,
});

export const Api_Doc: AxiosInstance = axios.create({
  baseURL: API_URL_DOC,
});

export const Api_Cont: AxiosInstance = axios.create({
  baseURL: API_URL_CONT,
});

export const Api_Ing: AxiosInstance = axios.create({
  baseURL: API_URL_ING,
});

export const ApiLogin: AxiosInstance = axios.create({
  baseURL: API_URL_PROSEG,
});

setupInterceptors(Api_Proseg);
setupInterceptors(Api_Log);
setupInterceptors(Api_Comp);
setupInterceptors(Api_Doc);
setupInterceptors(Api_Cont);
setupInterceptors(Api_Ing);
setupInterceptors(ApiLogin);
