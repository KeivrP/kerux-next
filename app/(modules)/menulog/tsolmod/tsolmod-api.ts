import { Api_Log } from "@/server/API";
import { Cabssmod, Detssmod } from "./tsolmod-types";

export const tsolmodGenerat = async (id: number) => {
  try {
    const res = await Api_Log.post(
      `sols_sums_mods_crud/boton_genera_solicitud?idsolsum=${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const tsolmodCreateRng = async (data: any) => {
  try {
    const res = await Api_Log.post(`/rengs_mods_crud`, {
      rengssmods: data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const tsolmodDelete = async (id: number) => {
  try {
    const res = await Api_Log.delete(`/sols_sums_mods_crud/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const tsolmodDeleteRenglon = async (id: number, rng: number) => {
  try {
    const res = await Api_Log.delete(
      `rengs_mods_crud?numsolsum=${id}&nroreng=${rng}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const tsolmodmUpdate = async (id: number | null, data: Cabssmod) => {
  try {
    const res = await Api_Log.put(`/sols_sums_mods_crud/${id}`, {
      ssmodelo: data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const tsolmodmUpdateRenglon = async (
  id: number | null,
  nro: number,
  data: Cabssmod
) => {
  try {
    const res = await Api_Log.put(`/sols_sums_mods_crud/${id}`, {
      numsolsum: id,
      nroreng: nro,
      ssmodelo: data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
