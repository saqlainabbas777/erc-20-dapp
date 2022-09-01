import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

type AppContextType = {
    userAddress: string;
    connectWallet: () => void
}

const appContextDefaultValues: AppContextType = {
    userAddress: '',
    connectWallet: () => {}
};

// @ts-ignore
export const AppProvider = ({children}) => {
    const router = useRouter();
    const [currentAccount, setCurrentAccount] = useState<string>('');
    useEffect(() => {
        checkIfWalletIsConnected().then();
    }, [])

    const connectWallet = async () => {
        if (window !== undefined) {
            const metaMask =  window.ethereum;
            try {
                if (!metaMask) return alert('Please install metamask');
                const accounts = await metaMask.request({method: 'eth_requestAccounts'});
                setCurrentAccount(accounts[0]);
                if (accounts.length) {
                    router.push('/appDetail').then();
                }
            } catch(error) {
                console.log('error', error);
                throw new Error('No Ethereum Object');
            }
        }
    }

    const checkIfWalletIsConnected = async () => {
        if (window !== undefined) {
            const metaMask =  window.ethereum;
            try {
                if (!metaMask) return alert('Please install metamask');
                const accounts = await metaMask.request({method: 'eth_accounts'});
                if (accounts.length) {
                    setCurrentAccount(accounts[0]);
                    router.push('/appDetail').then();
                }
            } catch(error) {
                console.log('error', error);
                throw new Error('No Ethereum Object');
            }
        }
    }

    return (
        <AppContext.Provider value={{
            userAddress: currentAccount,
            connectWallet: connectWallet
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const AppContext = React.createContext<AppContextType>(appContextDefaultValues)

