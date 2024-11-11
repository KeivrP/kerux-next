import { useMutation } from "@tanstack/react-query";
import { PasoRutas, RutaData } from "../trutas-types";
import { createRuta, deleteRuta, pasoRutasCreate, pasoRutasDelete, pasoRutasUpdate, updateRuta } from "../trutas-api";
import { showNotification } from "@/components/toast/toast";

export const useCreateRuta = () => {
  return useMutation({
    mutationFn: (data: RutaData) => createRuta(data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error creating ruta:", error);
    },
  });
};

export const useUpdateRuta = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RutaData }) =>
      updateRuta(id, data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error updating ruta:", error);
    },
  });
};

export const useDeleteRuta = () => {
  return useMutation({
    mutationFn: (id: string) => deleteRuta(id),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error deleting ruta:", error);
    },
  });
};


export const useCreatePasoRuta = () => {
  return useMutation({
    mutationFn: (data: PasoRutas) => pasoRutasCreate(data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error creating ruta:", error);
    },
  });
};

export const useUpdatePasoRuta = () => {
  return useMutation({
    mutationFn: (data: PasoRutas) => pasoRutasUpdate(data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error updating ruta:", error);
    },
  });
};

export const useDeletePasoRuta = () => {
  return useMutation({
    mutationFn: (data: PasoRutas) => pasoRutasDelete(data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error deleting ruta:", error);
    },
  });
};

