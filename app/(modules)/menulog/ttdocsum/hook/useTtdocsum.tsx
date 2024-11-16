import { showNotification } from "@/components/toast/toast";
import { useMutation } from "@tanstack/react-query";
import { deleteTiposDocs } from "../ttdocsum-api";


export const useDeleteTdocsum = () => {

    return useMutation({
      mutationFn: ({ id }: { id: string }) => deleteTiposDocs(id),
      onSuccess: (res) => {
        showNotification(res);
      },
      onError: (error) => {
        console.error('Error uploading documents:', error);
      }
    });
}