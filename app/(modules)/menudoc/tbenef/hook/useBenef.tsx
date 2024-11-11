import { useMutation } from "@tanstack/react-query";
import { deleteBenef } from "../tbenef-api";
import { showNotification } from "@/components/toast/toast";

export const useDeleteBenef = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteBenef(id),
    onSuccess: (res) => {
      console.log(res)
      showNotification(res);
    },
    onError: (error) => {
      console.error("Error uploading documents:", error);
    },
  });
};
