import {toast} from "react-toastify";
import {ToastTypes} from "./types";

export async function toastTransactionProcess(method: any, params: ToastTypes) {
    await toast.promise(method, {
        pending: params.pending,
        success: params.success,
        error: params.error,
    })
}
