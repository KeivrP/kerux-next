import { showNotification } from "@/components/toast/toast";
import { useMutation } from "@tanstack/react-query";
import { createTipoDoc, deleteTiposDocs, updateTipoDoc } from "../ttdocsum-api";
import { ITipodoc } from "../ttdocsum-types";


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
    mutationFn: ({ data }: { data: ITipodoc }) => updateTipoDoc(data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error('Error uploading documents:', error);
    }
  });
}
export const useCreateTipoDoc = () => {

  return useMutation({
    mutationFn: ({ data }: { data: ITipodoc }) => createTipoDoc(data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error('Error uploading documents:', error);
    }
  });
}

