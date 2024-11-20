import { Api_Comp } from "@/server/API";
import { Compradoreslist } from "./tcompdor-types";

export const updateCompradores = async (data: Compradoreslist) => {
    try {
      const res = await Api_Comp.put(`/compradores_crud/${data.codcomprador}`, {
        comprador: data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  export const deleteCompradores = async (id: string) => {
    try {
      const res = await Api_Comp.delete(`/compradores_crud/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }