import { Response } from "@/components/toast/toast";
import { Controllist } from "./fctrllog-types";
import { Api_Log } from "@/server/API";

export const updateFctrLog = async (data: Controllist): Promise<Response> => {
    try {
        const res = await Api_Log.put(`ctrls_logs_crud/N`, {
            controlog: data
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
