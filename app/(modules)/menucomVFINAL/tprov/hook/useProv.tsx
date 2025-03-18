import { useMutation } from "@tanstack/react-query";
import { deleteProveedor } from "../tprov-api";
import { showNotification } from "@/components/toast/toast";

export const useDeleteProveedor= () => {
    return useMutation({
        mutationFn: (id: string) => deleteProveedor(id),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error deleting Criterios:', error);
        }
    });
}