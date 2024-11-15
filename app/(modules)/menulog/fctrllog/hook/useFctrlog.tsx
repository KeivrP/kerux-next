import { showNotification } from "@/components/toast/toast";
import { Controllist } from "../fctrllog-types";
import { updateFctrLog } from "../fctrllog-api";
import { useMutation } from "@tanstack/react-query";

// Hook para subir documentos
export const useFctrLog = () => {

  return useMutation({
    mutationFn: ({ data }: { data: Controllist }) => updateFctrLog(data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error('Error uploading documents:', error);
    }
  });
};