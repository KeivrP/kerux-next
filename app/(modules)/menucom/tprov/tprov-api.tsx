import { Api_Comp } from "@/server/API";

export const deleteProveedor = async (id: string) => {
  try {
    const res = await Api_Comp.delete(`/proveedores_crud/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};