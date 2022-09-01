import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {AppProvider} from "../context/appContext";
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
        </AppProvider>
    )
}

export default MyApp
