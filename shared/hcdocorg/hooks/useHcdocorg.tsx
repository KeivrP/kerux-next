import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@/components/toast/toast";
import { rejectHistoy, reprocessHistory } from "../hcdocorg-api";

export const useReject = () => {
  return useMutation({
    mutationFn: ({ iddoc }: { iddoc: number }) => rejectHistoy(iddoc),
    onSuccess: (res) => {
      console.log(res)
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error reject documents:", error);
    },
  });
};

export const useReprocess = () => {
    return useMutation({
        mutationFn: ({ iddoc }: { iddoc: number }) => reprocessHistory(iddoc),
        onSuccess: (res) => {
        console.log(res)
        showNotification(res);
        },
        onError: (error) => {
        console.error("Error reprocess documents:", error);
        },
    });
    }

