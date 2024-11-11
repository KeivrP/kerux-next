import { Api_Doc } from "@/server/API";

export const rejectHistoy = async (iddoc: number) => {
    try {
        const res = await Api_Doc.delete(`/eventos_admon/rechazar${iddoc}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const reprocessHistory = async (iddoc: number) => {
    try {
        const res = await Api_Doc.delete(`/eventos_admon/reprocesar${iddoc}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

}
