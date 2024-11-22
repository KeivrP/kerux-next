import { useMutation } from "@tanstack/react-query";

import { showNotification } from "@/components/toast/toast";
import { devolverSolrec } from "../tsolrec-api";

export const useDevolver = () => {
  return useMutation({
    mutationFn: (id: number) => devolverSolrec(id),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};
