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