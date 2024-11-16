import { useMutation } from "@tanstack/react-query";
import { Tiporngsumlist } from "../ttiprngsum-types";
import { updateTipRngsSumoLog } from "../ttiprngsum-api";
import { showNotification } from "@/components/toast/toast";

// Hook para subir documentos
export const useUpdateTipoReng = () => {

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tiporngsumlist }) => updateTipRngsSumoLog(id, data),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error('Error uploading documents:', error);
    }
  });
};