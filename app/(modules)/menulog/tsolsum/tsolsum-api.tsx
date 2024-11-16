import { Api_Log } from "@/server/API";

export const tsolsumGenerate = async (id: number) => {
    try {
        const res = await Api_Log.post(`/sols_sums_crud/boton_generar?idsolsum=${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
