import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {ContractMetaData} from "../helper/types";

type AppContextType = {
    userAddress: string;
    connectWallet: () => void;
    contractMetaData: ContractMetaData,
    setMetaData: (metaData: ContractMetaData) => void;
}

const appContextDefaultValues: AppContextType = {
    userAddress: '',
    connectWallet: () => {},
    contractMetaData: {
        name: null,
        symbol: null,
        contractAddress: null
    },
    setMetaData: () => {},
};

// @ts-ignore
export const AppProvider = ({children}) => {
    const router = useRouter();
    const [currentAccount, setCurrentAccount] = useState<string>('');
    const [contractMetaData, setContractMetaData] = useState<ContractMetaData>({
        name: null,
        symbol: null,
        contractAddress: null
    });
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
                    router.push('/ContractDetail').then();
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
                    router.push('/contractDetail').then();
                }
            } catch(error) {
                console.log('error', error);
                throw new Error('No Ethereum Object');
            }
        }
    }

    function setMetaData(metaData: ContractMetaData) {
        setContractMetaData(metaData);
    }
    return (
        <AppContext.Provider value={{
            userAddress: currentAccount,
            connectWallet: connectWallet,
            contractMetaData: contractMetaData,
            setMetaData: setMetaData
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const AppContext = React.createContext<AppContextType>(appContextDefaultValues)

