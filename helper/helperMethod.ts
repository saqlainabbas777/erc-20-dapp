import {toast} from "react-toastify";
import {ToastTypes} from "./types";

export async function toastTransactionProcess(method: any, params: ToastTypes) {
    await toast.promise(method, {
        pending: params.pending,
        success: params.success,
        error: params.error,
    })
}

export function toastMessage(message: string) {
    toast(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
