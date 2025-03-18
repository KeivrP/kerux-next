import { Api_Comp } from "@/server/API";
import { RuteoUnidadeslist } from "./truteoundcmp-type";

export const createRuteo = async (data: RuteoUnidadeslist) => {
  try {
    const res = await Api_Comp.post("/ruteo_undscompras_crud", {
      ruteo_undcompra: data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateRuteo = async (id: string, data: RuteoUnidadeslist) => {
  try {
    const res = await Api_Comp.put(`/ruteo_undscompras_crud/${id}`, {
      ruteo_undcompra: data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteRuteo = async (id: string) => {
  try {
    const res = await Api_Comp.delete(`/ruteo_undscompras_crud/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};