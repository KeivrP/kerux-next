import { useMutation } from "@tanstack/react-query";
import {
  fsolsumRng,
  fsolsumUpdate,
  tsolsumAnular,
  tsolsumCreateModelo,
  tsolsumGenerate,
} from "../tsolsum-api";
import { showNotification } from "@/components/toast/toast";
import { Cabsolsum, Detsolsum } from "../tsolsum-types";

export const useGenerateTnivsum = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => tsolsumGenerate(id),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error updating nivsum:", error);
    },
  });
};
export const useAnularTnivsum = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => tsolsumAnular(id),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error updating nivsum:", error);
    },
  });
};
export const useCreateModeloTnivsum = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => tsolsumCreateModelo(id),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error updating nivsum:", error);
    },
  });
};
export const useUpdateFsolsum = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number | null; data: Cabsolsum }) =>
      fsolsumUpdate(id, data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error updating nivsum:", error);
    },
  });
};
export const useUpdateRenglon = () => {
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
