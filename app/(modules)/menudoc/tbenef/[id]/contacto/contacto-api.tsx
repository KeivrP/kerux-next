import { Response } from "@/components/toast/toast";
import { Api_Doc } from "@/server/API";

export const deleteContacto = async (id: number): Promise<Response> => {
    try {
        const res = await Api_Doc.delete(`/contactos_crud/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const updateContacto = async (id: number, data: any): Promise<Response> => {
    try {
        const res = await Api_Doc.put(`/contactos_crud/${id}`, { contacto: data });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createContacto = async (data: any): Promise<Response> => {
    try {
        const res = await Api_Doc.post(`/contactos_crud`, {contacto: data});
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

