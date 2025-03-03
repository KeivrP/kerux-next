import { Api_Doc } from "@/server/API";

export const deleteTipoDoc = async (id: string) => {
    try {
        const res = await Api_Doc.delete(`/tipos_docs_crud/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createTipoDoc = async (data: any) => {
    try {
        const res = await Api_Doc.post(`/tipos_docs_crud`, {tipodoc: data});
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateTipoDoc = async (id: string, data: any) => {
    try {
        const res = await Api_Doc.put(`/tipos_docs_crud/${id}`, {tipodoc: data});
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}