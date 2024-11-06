import { useMutation } from "@tanstack/react-query";
import { deleteBenef } from "../tbenef-api";
/*  import { useSnackbar } from "../../../shared/components/helper/snackbar";
 */
export const useDeleteBenef = () => {
/*     const { handleSnack } = useSnackbar();
 */ 
    return useMutation({
      mutationFn: ({ id }: { id: number }) => deleteBenef(id),
      onSuccess: (res) => {
/*         handleSnack(res?.message, true, res?.mode);
 */      },
      onError: (error) => {
        console.error('Error uploading documents:', error);
      }
    });
}