import { showNotification } from "@/components/toast/toast";
import { useMutation } from "@tanstack/react-query";
import { reassignDocumentUA } from "../treaundejec";

export const useReassignDocumentUA = () => {

    return useMutation({
        mutationFn: ({ iddoc, codujec }: { iddoc: number[], codujec: string }) => reassignDocumentUA(iddoc, codujec),
        onSuccess: (res) => {
            showNotification(res);
        },
        onError: (error) => {
            console.error('Error reassigning document:', error);
        }
    });
}