import { Response } from "@/components/toast/toast";
import { Api_Log } from "@/server/API";

export const deleteTcambio = async (idsolsum: string, nrocambio: string): Promise<Response> => {
    try {
        const res = await Api_Log.post(`/cambios_crud/boton_eliminar_cambio`, {
            idsolsum,
            nrocambio
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}