import { Api_Comp } from "@/server/API";
import { Criterioslist } from "./tcevalprov-type";

export const createCriterio = async (data: Criterioslist) => {
  try {
    const res = await Api_Comp.post("/criterios_eval_crud", {
      criterios_eval: data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCriterio = async (id: string, data: Criterioslist) => {
  try {
    const res = await Api_Comp.put(`/criterios_eval_crud/${id}`, {
      criterios_eval: data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCriterio = async (id: string) => {
  try {
    const res = await Api_Comp.delete(`/criterios_eval_crud/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};