export type ToastTypes = {
    pending: string,
    success: string,
    error: string,
}
export type ContractMetaData = {
    name: string | null,
    symbol: string | null,
    contractAddress: string | null
}

export type SpenderData = {
    userBalance: string,
    spenderBalance: string,
    spenderAllowance: string
}
export type AppContextType = {
    userAddress: string;
    connectWallet: () => void;
    contractMetaData: ContractMetaData,
    setMetaData: (metaData: ContractMetaData) => void;
}
