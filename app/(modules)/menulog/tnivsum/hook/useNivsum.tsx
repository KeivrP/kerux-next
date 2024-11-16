import { showNotification } from "@/components/toast/toast";
import { useMutation } from "@tanstack/react-query";

import { deleteNivsum, updateNivsum, updateCcostoNivsum, deleteCcostoNivsum } from "../tnivsum-api";
import { ITnivsum } from "../tnivsum-types";

export const useDeleteNivsum = () => {
    return useMutation({
        mutationFn: (id: string) => deleteNivsum(id),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error deleting nivsum:', error);
        }
    });
}

export const useUpdateNivsum = () => {
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: ITnivsum }) => updateNivsum(id, data),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error updating nivsum:', error);
        }
    });
}

export const useUpdateCcostoNivsum = () => {
    return useMutation({
        mutationFn: ({ id, ccosto, dataCcostoNiv }: { id: string, ccosto: string, dataCcostoNiv: { ccosto: string } }) => updateCcostoNivsum(id, ccosto, dataCcostoNiv),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error updating ccosto nivsum:', error);
        }
    });
}

export const useDeleteCcostoNivsum = () => {
    return useMutation({
        mutationFn: ({ id, ccosto }: { id: string, ccosto: string }) => deleteCcostoNivsum(id, ccosto),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error deleting ccosto nivsum:', error);
        }
    });
}