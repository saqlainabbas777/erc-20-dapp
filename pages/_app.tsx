import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import type {AppProps} from 'next/app'
import {AppProvider} from "../context/appContext";
import {ToastContainer} from "react-toastify";
declare global {
    interface Window {
        // @ts-ignore
        ethereum?: any;
    }
}
function MyApp({Component, pageProps}: AppProps) {
    return (
        <AppProvider>
            <Component {...pageProps} />
            <ToastContainer position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            theme={'dark'}
                            pauseOnFocusLoss
                            draggable
                            closeButton={false}
                            pauseOnHover/>
        </AppProvider>
    )
}

export default MyApp
