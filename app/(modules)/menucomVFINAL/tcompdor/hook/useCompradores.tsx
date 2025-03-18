import { useMutation } from "@tanstack/react-query";
import { Compradoreslist } from "../tcompdor-types";
import { deleteCompradores, updateCompradores } from "../tcompdor-api";
import { showNotification } from "@/components/toast/toast";

export const useUpdateCompradores= () => {
    return useMutation({
        mutationFn: ({ data }: { data: Compradoreslist }) => updateCompradores(data),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error updating Compradores:', error);
        }
    });
}

export const useDeleteCompradores= () => {
    return useMutation({
        mutationFn: (id: string) => deleteCompradores(id),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error deleting Compradores:', error);
        }
    });
}