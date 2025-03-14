import { useMutation } from "@tanstack/react-query";

import { showNotification } from "@/components/toast/toast";
import { AnularRngSC, AnularSC, GenerarCot, updateSC } from "../tsolpencomp-api";



export const useAnularSC= () => {
    return useMutation({
        mutationFn: ({ id, mensaje }: {id: string, mensaje: string }) => AnularSC(id, mensaje),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error updating Unidades de Compra:', error);
        }
    });
}

export const useGenerarCot= () => {
    return useMutation({
        mutationFn: ({ id, feccot, nrorengsc, numprov }: {id: number, feccot: string, nrorengsc: number[], numprov: number[]}) => GenerarCot( id, feccot, nrorengsc, numprov),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error updating Unidades de Compra:', error);
        }
    });
}

export const useAnulaRngSC= () => {
    return useMutation({
        mutationFn: ({ id, nrorengsc }: {id: string, nrorengsc: string }) => AnularRngSC(id, nrorengsc),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error updating Unidades de Compra:', error);
        }
    });
}


export const useUpdateSC = () => {
    return useMutation({
        mutationFn: ({ id, sol_compra }: {id: string, sol_compra: any }) => updateSC(id, sol_compra),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error updating Unidades de Compra:', error);
        }
    });
}




