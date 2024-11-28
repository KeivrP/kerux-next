import { useMutation } from "@tanstack/react-query";

import { showNotification } from "@/components/toast/toast";
import { asignarComprador, devolverSolrec } from "../tsolrec-api";

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

export const useAsignar = () => {
  return useMutation({
    mutationFn: ({ id, codcomprador, descsc, fecsol, codaccint }: { id: number, codcomprador: string, descsc: string, fecsol: string, codaccint: string }) => asignarComprador(id, codcomprador, descsc, fecsol, codaccint),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
}