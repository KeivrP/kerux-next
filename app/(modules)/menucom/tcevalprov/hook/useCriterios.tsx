import { useMutation } from "@tanstack/react-query";
import { Criterioslist } from "../tcevalprov-type";
import { createCriterio, deleteCriterio, updateCriterio } from "../tcevalprov-api";
import { showNotification } from "@/components/toast/toast";


export const useCreateCriterio= () => {
    return useMutation({
        mutationFn: (data: Criterioslist) => createCriterio(data),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error creating Criterios:', error);
        }
    });
}

export const useUpdateCriterio= () => {
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: Criterioslist }) => updateCriterio(id, data),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error updating Criterios:', error);
        }
    });
}

export const useDeleteCriterio= () => {
    return useMutation({
        mutationFn: (id: string) => deleteCriterio(id),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error deleting Criterios:', error);
        }
    });
}