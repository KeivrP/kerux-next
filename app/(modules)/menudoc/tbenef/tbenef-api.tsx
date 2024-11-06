import { Api_Doc } from "@/server/API";
import { useQuery } from "@tanstack/react-query";

export const deleteBenef = async (id: number) => {
    try {
        const res = await Api_Doc.delete(`/beneficiarios_crud/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

}
