import { showNotification } from "@/components/toast/toast";
import { devloverDocFin } from "../tdocfin-api";
import { useMutation } from "@tanstack/react-query";

export const useReturnsDocFin = () => {

    return useMutation({
        mutationFn: ({ id }: { id: number[] }) => devloverDocFin(id),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error returns document:', error);
        }
    });
}