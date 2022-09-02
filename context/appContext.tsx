import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {AppContextType, ContractMetaData} from "../helper/types";



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
        if (window.ethereum !== undefined) {
            window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
                if (accounts.length) {
                    setCurrentAccount(accounts[0]);
                } else {
                    setCurrentAccount('');
                    router.push('/').then();
                }
            });
        }
    }, [])

    const connectWallet = async () => {
        if (window !== undefined) {
            const metaMask =  window.ethereum;
            try {
                if (!metaMask) return alert('Please install metamask');
                const accounts = await metaMask.request({method: 'eth_requestAccounts'});
                setCurrentAccount(accounts[0]);
                if (accounts.length) {
                    router.push('/contractDetail').then();
                }
            } catch(error) {
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

