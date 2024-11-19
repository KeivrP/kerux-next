import { useMutation } from "@tanstack/react-query";
import { RuteoUnidadeslist } from "../truteoundcmp-type";
import { createRuteo, deleteRuteo, updateRuteo } from "../truteoundcmp-api";
import { showNotification } from "@/components/toast/toast";

export const useCreateRuteo= () => {
    return useMutation({
        mutationFn: (data: RuteoUnidadeslist) => createRuteo(data),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error creating Ruteo:', error);
        }
    });
}

export const useUpdateRuteo= () => {
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: RuteoUnidadeslist }) => updateRuteo(id, data),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error updating Ruteo:', error);
        }
    });
}

export const useDeleteRuteo= () => {
    return useMutation({
        mutationFn: (id: string) => deleteRuteo(id),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error deleting Ruteo:', error);
        }
    });
}