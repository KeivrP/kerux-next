import { useMutation } from "@tanstack/react-query";
import { createBenef, deleteBenef, updateBenef } from "../tbenef-api";
import { showNotification } from "@/components/toast/toast";

export const useDeleteBenef = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteBenef(id),
    onSuccess: (res) => {
      console.log(res)
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error uploading documents:", error);
    },
  });
};

export const useUpdateBenef = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateBenef(id, data),
    onSuccess: (res) => {
      console.log(res)
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error uploading documents:", error);
    },
  });
}

export const useCreateBenef = () => {
  return useMutation({
    mutationFn: (data: any) => createBenef(data),
    onSuccess: (res) => {
      console.log(res)
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error uploading documents:", error);
    },
  });
}