import { Response } from "@/components/toast/toast";
import { Api_Doc } from "@/server/API";

export const deleteBenef = async (id: number): Promise<Response> =>  {
    try {
        const res = await Api_Doc.delete(`/beneficiarios_crud/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const updateBenef = async (id: number, data: any): Promise<Response> =>  {
    try {
        const res = await Api_Doc.put(`/beneficiarios_crud/${id}`, data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createBenef = async (data: any): Promise<Response> =>  {
    try {
        const res = await Api_Doc.post(`/beneficiarios_crud`, data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

