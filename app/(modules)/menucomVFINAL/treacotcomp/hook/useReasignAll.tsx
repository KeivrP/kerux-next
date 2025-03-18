import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@/components/toast/toast";
import { reAsignarComprador } from "../Treacotcomp-api";

export const useReAsignar = () => {
  return useMutation({
    mutationFn: ({ numcot, codcomprador }: { numcot: number[], codcomprador: string }) => reAsignarComprador(numcot, codcomprador),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
}
