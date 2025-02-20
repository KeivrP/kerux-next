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

export const UpdateCambio = async (idsolsum: string, nrocambio: string, nroreng: string, data: any): Promise<Response> => {
    try {
        const res = await Api_Log.put(`/rengs_camb_crud`, {
            idsolsum,
            nrocambio,
            nroreng,
            ...data
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const CreateCambio = async ( data: any): Promise<Response> => {
    try {
        const res = await Api_Log.post(`/rengs_camb_crud`, {
            rengcambioss: data
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const DeleteCambio = async (idsolsum: string, nrocambio: string, nroreng: string): Promise<Response> => {
    try {
        const res = await Api_Log.delete(`/rengs_camb_crud`, {
            params: {
                idsolsum,
                nrocambio,
                nroreng
            }
        });
        return res.data;
        } catch (error) {
        console.log(error);
        throw error;
        }
}

export const ProcesarCambio = async (idsolsum: string, nrocambio: string): Promise<Response> => {
    try {
        const res = await Api_Log.post(`/cambios_crud/boton_procesar_cambio`, {
            idsolsum,
            nrocambio
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
