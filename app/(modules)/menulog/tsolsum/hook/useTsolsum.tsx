import { useMutation } from "@tanstack/react-query";
import { tsolsumGenerate } from "../tsolsum-api";
import { showNotification } from "@/components/toast/toast";

export const useGenerateTnivsum = () => {
    return useMutation({
        mutationFn: ({ id }: { id: number }) => tsolsumGenerate(id),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error updating nivsum:', error);
        }
    });
}
