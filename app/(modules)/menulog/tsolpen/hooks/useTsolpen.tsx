import { useMutation } from "@tanstack/react-query";
import { GenerarModel } from "../tsolpen-api";
import { showNotification } from "@/components/toast/toast";

export const useGenerarModel= () => {
    return useMutation({
      mutationFn: ({ id }: { id: string }) => GenerarModel(id),
      onSuccess(res) {
        showNotification(res);
      },
      onError: (error) => {
        console.error('Error uploading documents:', error);
      }
    });
  }