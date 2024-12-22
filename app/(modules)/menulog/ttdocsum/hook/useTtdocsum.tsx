import { showNotification } from "@/components/toast/toast";
import { useMutation } from "@tanstack/react-query";
import { deleteTiposDocs, updateTipoDoc } from "../ttdocsum-api";
import { Tipodoc } from "../ttdocsum-types";


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

export const useUpdateTipoDoc = () => {

  return useMutation({
    mutationFn: ({ data }: { data: Tipodoc }) => updateTipoDoc(data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error('Error uploading documents:', error);
    }
  });
}

