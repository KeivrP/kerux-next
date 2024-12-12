import { Api_Log } from "@/server/API";
import { Cabsolsum, Detsolsum } from "./tsolsum-types";

export const tsolsumGenerate = async (id: number) => {
  try {
    const res = await Api_Log.post(
      `/sols_sums_crud/boton_generar?idsolsum=${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const tsolsumCreateModelo = async (id: number) => {
  try {
    const res = await Api_Log.post(
      `/sols_sums_crud/boton_crear_modelo?idsolsum=${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const tsolsumAnular = async (id: number) => {
  try {
    const res = await Api_Log.post(
      `/sols_sums_crud/boton_anular?idsolsum=${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fsolsumUpdate = async (id: number | null, data: Cabsolsum) => {
  try {
    const res = await Api_Log.put(`/sols_sums_crud/update`, {
      idsolsum: id,
      data_solsum: data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const fsolsumRng = async (id: number, nro: number, data: Detsolsum) => {
  try {
    const res = await Api_Log.put(`/sols_sums_crud/update_rng`, {
      idsolsum: id,
      nroreng: nro,
      data_rngsolsum: data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
