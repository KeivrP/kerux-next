import { showNotification } from "@/components/toast/toast";
import { CreateCambio, DeleteCambio, deleteTcambio, GuardarCambio, ProcesarCambio, UpdateCambio, UpdateCambioGener } from "../tcambios-api";
import { useMutation } from "@tanstack/react-query";
import { error } from "console";
import { useRouter } from "next/navigation";

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

export const useProcesarCambio = () => {
  return useMutation({
    mutationFn: ({ idsolsum, nrocambio }: { idsolsum: string, nrocambio: string }) => ProcesarCambio(idsolsum, nrocambio),
    onSuccess(res) {
      showNotification(res);
    },
    onError: (error) => {
      console.error('Error uploading documents:', error);
    }
  });
}

export const CrearSolicitud = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ data }: { data: any }) => GuardarCambio(data),
    onSuccess(res, variables) {
      const match = res?.message.match(/(\d+)/);
      const numero = match ? match[1] : null;
      const id = variables.data.idsolsum;
      const encodedIds = (`${id}-${numero}`)

      if (numero) {
        router.push(`/menulog/tcambioss/${encodedIds}`);
      }
      showNotification(res);
    },
    onError: (error) => {
      console.error('Error uploading documents:', error);
    }
  });
};

export const ActualizarSolicitud = () => {
  return useMutation({
    mutationFn: ({ idsolsum, nrocambio, data }: { idsolsum: string, nrocambio: string, data: any }) => UpdateCambioGener(idsolsum, nrocambio, data),
    onSuccess(res) {
      const respuesta = { alert: res?.alert, message: res?.message, mode: res?.mode };
      showNotification(respuesta);
    },
    onError: (error) => {
      console.error('Error uploading documents:', error);
    }
  });
};