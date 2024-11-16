import { showNotification } from "@/components/toast/toast";
import { deleteTcambio } from "../tcambios-api";
import { useMutation } from "@tanstack/react-query";

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