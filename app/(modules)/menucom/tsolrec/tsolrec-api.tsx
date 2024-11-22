import { Api_Comp } from "@/server/API";
import { ITSolRec } from "./tsolrec-types";

export const updateCompradores = async (data: ITSolRec) => {
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
  
  export const devolverSolrec = async (id: number) => {
    try {
      const res = await Api_Comp.post(`/sol_compras/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }