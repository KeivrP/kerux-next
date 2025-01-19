import { useMutation } from "@tanstack/react-query";

import { showNotification } from "@/components/toast/toast";
import { tsolmodCreateRng, tsolmodDelete, tsolmodDeleteRenglon, tsolmodGenerat, tsolmodmUpdate, tsolmodmUpdateRenglon } from "../tsolmod-api";
import { Cabssmod, Detssmod } from "../tsolmod-types";

export const useGenerateTsolmod = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => tsolmodGenerat(id),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error updating nivsum:", error);
    },
  });
};

export const useCreateRenglonTsolmod = () => {
  return useMutation({
    mutationFn: (data) => tsolmodCreateRng(data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error updating nivsum:", error);
    },
  });
};
export const useUpdateTsolmodRenglon = () => {
  return useMutation({
    mutationFn: ({ id, data, nro }: { id: number | null; nro: number; data: Cabssmod }) =>
      tsolmodmUpdateRenglon(id, nro, data),
    onSuccess: (res) => {

      showNotification(res);
    },
    onError: (error) => {
      console.error("Error updating nivsum:", error);
    },
  });
};
export const useUpdateTsolmod = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number | null; data: Cabssmod }) =>
      tsolmodmUpdate(id, data),
    onSuccess: (res) => {

      showNotification(res);
    },
    onError: (error) => {
      console.error("Error updating nivsum:", error);
    },
  });
};

export const useDeleteTsolmod = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => tsolmodDelete(id),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error updating nivsum:", error);
    },
  });
};
export const useDeleteRenglonTsolmod = () => {
  return useMutation({
    mutationFn: ({ id, rng }: { id: number, rng: number }) => tsolmodDeleteRenglon(id, rng),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error updating nivsum:", error);
    },
  });
};
/* export const useUpdateRenglon = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
      nro,
    }: {
      id: number;
      data: Detsolsum;
      nro: number;
    }) => fsolsumRng(id, nro, data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error updating nivsum:", error);
    },
  });
};
 */