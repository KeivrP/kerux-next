import { useMutation } from "@tanstack/react-query";
import { createContacto, updateContacto, deleteContacto} from "../contacto-api";
import { showNotification } from "@/components/toast/toast";

export const useDeleteContacto = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteContacto(id),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error uploading documents:", error);
    },
  });
};

export const useUpdateContacto = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateContacto(id, data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error uploading documents:", error);
    },
  });
}

export const useCreateContacto = () => {
  return useMutation({
    mutationFn: (data: any) => createContacto(data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error uploading documents:", error);
    },
  });
}