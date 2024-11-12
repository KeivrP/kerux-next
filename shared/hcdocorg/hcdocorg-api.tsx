import { Api_Doc } from "@/server/API";

export const rejectHistory = async (iddoc: number[]) => {
    try {
        const res = await Api_Doc.delete(`/eventos_admon/rechazar`, { data: { iddoc } });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const reprocessHistory = async (iddoc: number[]) => {
    try {
        const res = await Api_Doc.delete(`/eventos_admon/reprocesar`, { data: { iddoc } });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
