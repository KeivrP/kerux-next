import { Response } from "@/components/toast/toast";
import { Api_Log } from "@/server/API";

export const GenerarModel = async (id: string): Promise<Response> => {
    try {
        const res = await Api_Log.post(`/sols_sums_crud/boton_crear_modelo?idsolsum=${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
