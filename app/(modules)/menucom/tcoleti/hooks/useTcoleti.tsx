import { useMutation } from "@tanstack/react-query";

import { showNotification } from "@/components/toast/toast";
import { ColetillasInterface } from "../tcoleti-types";
import { createTcoleti, deleteTcoleti, updateTcoleti } from "../tcoleti-api";

export const useCreateTColeti= () => {
    return useMutation({
        mutationFn: (data: ColetillasInterface) => createTcoleti(data),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error creating:', error);
        }
    });
}

export const useUpdateTColeti= () => {
    return useMutation({
        mutationFn: ({ id, data }: {id: string, data: ColetillasInterface }) => updateTcoleti(id, data),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error updating:', error);
        }
    });
}

export const useDeleteTColeti= () => {
    return useMutation({
        mutationFn: (id: string) => deleteTcoleti(id),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error deleting :', error);
        }
    });
}