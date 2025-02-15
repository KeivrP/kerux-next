import { showNotification } from "@/components/toast/toast";
import { CreateCambio, DeleteCambio, deleteTcambio, UpdateCambio } from "../tcambios-api";
import { useMutation } from "@tanstack/react-query";
import { error } from "console";

export const useDeleteTcambio = () => {

  return useMutation({
    mutationFn: ({ idsolsum, nrocambio }: { idsolsum: string; nrocambio: string }) => deleteTcambio(idsolsum, nrocambio),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error('Error uploading documents:', error);
    }
  });
};

export const useUpdateRenglon = () => {
  return useMutation({
    mutationFn: ({ idsolsum, nrocambio, nroreng, data }: { idsolsum: string, nrocambio: string, nroreng: string, data: any }) => UpdateCambio(idsolsum, nrocambio, nroreng, data),
    onSuccess(res) {
      const respuesta = { alert: res?.alert, message: res?.message, mode: res?.mode };
      showNotification(respuesta);
    },
    onError: (error) => {
      console.error('Error uploading documents:', error);
    }
  });
};
export const useCreateRenglon = () => {
  return useMutation({
    mutationFn: ({ data }: { data: any }) => CreateCambio(data),
    onSuccess(res) {
      const respuesta = { alert: res?.alert, message: res?.message, mode: res?.mode };
      showNotification(respuesta);
    },
    onError: (error) => {
      console.error('Error uploading documents:', error);
    }
  });
};

export const useDeleteRenglon = () => {
  return useMutation({
    mutationFn: ({ idsolsum, nrocambio, nroreng }: { idsolsum: string, nrocambio: string, nroreng: string }) => DeleteCambio(idsolsum, nrocambio, nroreng),
    onSuccess(res) {
      showNotification(res);
    },
    onError: (error) => {
      console.error('Error uploading documents:', error);
    }
  });
}