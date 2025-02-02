import { Response } from "@/components/toast/toast";
import { Api_Log } from "@/server/API";
import { ITipodoc } from "./ttdocsum-types";

export const deleteTiposDocs = async (id: string): Promise<Response> => {
    try {
        const res = await Api_Log.delete(`tipos_docs_crud/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const updateTipoDoc = async (data: ITipodoc): Promise<Response> => {
    try {
        const res = await Api_Log.put(`tipos_docs_crud/${data.tipodoc}`, {
            tipo_doc_log: data
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createTipoDoc = async (data: ITipodoc): Promise<Response> => {
    try {
        const res = await Api_Log.post(`tipos_docs_crud`, {
            tipo_doc_log: data
        });
        return res.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}


