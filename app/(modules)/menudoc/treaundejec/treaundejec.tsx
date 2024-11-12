import { Api_Doc } from "@/server/API";

export const reassignDocumentUA = async (iddoc: number[], codujec: string) => {
    try {
        const res = await Api_Doc.post('/documentos_origen/reasignar_ua', {
            iddoc,
            codujec
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}