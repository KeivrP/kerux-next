import { showNotification } from "@/components/toast/toast";
import { createTipoDoc, deleteTipoDoc, updateTipoDoc } from "../ttipodoc-api";
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

export const useCreateTipoDoc = () => {
    
    return useMutation({
        mutationFn: (data: any) => createTipoDoc(data),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error creating ruta:', error);
        }
    });
}

export const useUpdateTipoDoc = () => {
    
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => updateTipoDoc(id, data),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error updating ruta:', error);
        }
    });
}