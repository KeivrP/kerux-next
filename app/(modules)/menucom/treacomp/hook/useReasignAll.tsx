
import { useMutation } from "@tanstack/react-query";

import { showNotification } from "@/components/toast/toast";
import { reAsignarComprador } from "../Treacom-api";

export const useReAsignar = () => {
  return useMutation({
    mutationFn: ({ nrosc, codcomprador }: { nrosc: number[], codcomprador: string }) => reAsignarComprador(nrosc, codcomprador),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
}
