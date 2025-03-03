import { useMutation } from "@tanstack/react-query";
import { createBenef, deleteBenef, updateBenef } from "../tbenef-api";
import { showNotification } from "@/components/toast/toast";

export const useDeleteBenef = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteBenef(id),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error uploading documents:", error);
    },
  });
};

export const useUpdateBenef = () => {
  return useMutation({
    mutationFn: ({ id, beneficiario }: { id: number; beneficiario: any }) => updateBenef(id, beneficiario),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error uploading documents:", error);
    },
  });
}

export const useCreateBenef = () => {
  return useMutation({
    mutationFn: (beneficiario: any) => createBenef(beneficiario),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error uploading documents:", error);
    },
  });
}