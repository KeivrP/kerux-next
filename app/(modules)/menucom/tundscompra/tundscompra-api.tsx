import { Api_Comp } from "@/server/API";
import { UnidsCompraslist } from "./tundscompra-type";

export const createUndComp = async (data: UnidsCompraslist) => {
    try {
      const res = await Api_Comp.post("/unidades_compras_crud", {
        unidad_compra: data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const updateUndComp = async (id: string, data: UnidsCompraslist) => {
    try {
      const res = await Api_Comp.put(`/unidades_compras_crud/${id}`, {
        unidad_compra: data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const deleteUndComp = async (id: string) => {
    try {
      const res = await Api_Comp.delete(`/unidades_compras_crud/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };