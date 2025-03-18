import { useMutation } from "@tanstack/react-query";
import { UnidsCompraslist } from "../tundscompra-type";
import { createUndComp, deleteUndComp, updateUndComp } from "../tundscompra-api";
import { showNotification } from "@/components/toast/toast";


export const useCreateUndComp= () => {

    return useMutation({
        mutationFn: (data: UnidsCompraslist) => createUndComp(data),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error creating Unidades de Compra:', error);
        }
    });
}

export const useUpdateUndComp= () => {

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: UnidsCompraslist }) => updateUndComp(id, data),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error updating Unidades de Compra:', error);
        }
    });
}

export const useDeleteUndComp= () => {

    return useMutation({
        mutationFn: (id: string) => deleteUndComp(id),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error deleting Unidades de Compra:', error);
        }
    });
}