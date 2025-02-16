import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@/components/toast/toast";
import { rejectCot } from "../Tcotrest-api";

export const useReject = () => {
  return useMutation({
    mutationFn: ({ numcot }: { numcot: number }) => rejectCot(numcot),
    onSuccess: (res) => {
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
}
