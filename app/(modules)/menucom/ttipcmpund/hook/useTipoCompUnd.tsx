import { useMutation } from "@tanstack/react-query";
import { Tipocompundlist } from "../ttipcmpund-types";
import { createTipoComp, deleteTipoComp, updateTipoComp } from "../ttipcmpund-api";
import { showNotification } from "@/components/toast/toast";

export const useCreateTipoCompUnd= () => {
    return useMutation({
        mutationFn: (data: Tipocompundlist) => createTipoComp(data),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error creating Unidades de Compra:', error);
        }
    });
}

export const useUpdateTipoCompUnd= () => {
    return useMutation({
        mutationFn: ({ data }: {data: Tipocompundlist }) => updateTipoComp(data),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error updating Unidades de Compra:', error);
        }
    });
}

export const useDeleteTipoCompUnd= () => {
    return useMutation({
        mutationFn: (id: string) => deleteTipoComp(id),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error deleting Unidades de Compra:', error);
        }
    });
}