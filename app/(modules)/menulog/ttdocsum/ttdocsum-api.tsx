import { Response } from "@/components/toast/toast";
import { Api_Log } from "@/server/API";

export const deleteTiposDocs = async (id: string): Promise<Response> => {
    try {
        const res = await Api_Log.delete(`tipos_docs_crud/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
