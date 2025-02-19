import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@/components/toast/toast";
import { rejectCot } from "../Tcotpenp-api";

export const useReject = () => {
  return useMutation({
    mutationFn: ({ numcot, fecanu, motivo }: { numcot: number; fecanu: string; motivo: string }) => rejectCot(numcot, fecanu, motivo),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
}
