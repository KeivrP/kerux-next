import { showNotification } from "@/components/toast/toast";
import { deleteTipoDoc } from "../ttipodoc-api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTipoDoc = () => {

    return useMutation({
        mutationFn: (id: string) => deleteTipoDoc(id),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error deleting ruta:', error);
        }
    });
}