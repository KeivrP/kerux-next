import { Api_Log } from "@/server/API";
import { ITnivsum } from "./tnivsum-types";

export const deleteNivsum = async (id: string) => {
    try {
        const res = await Api_Log.delete(`/nivs_auts_crud/delete`, {
            params: { nivelsum: id }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateNivsum = async (id: string, data: ITnivsum) => {
    try {
        const res = await Api_Log.put(`/nivs_auts_crud/update`, {
            nivelsum: id,
            data_nivelsum: data
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateCcostoNivsum = async (id: string, ccosto: string, dataCcostoNiv: { ccosto: string }) => {
    try {
        const res = await Api_Log.put(`ccostos_nivs_crud/update`, {
            nivelsum: id,
            ccosto: ccosto,
            data_ccostoniv: dataCcostoNiv
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteCcostoNivsum = async (id: string, ccosto: string) => {
    try {
        const res = await Api_Log.delete(`ccostos_nivs_crud/delete`, {
            params: {
                nivelsum: id,
                ccosto: ccosto
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}