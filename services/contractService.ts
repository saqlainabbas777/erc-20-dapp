import Web3Modal from "web3modal";
import {ethers} from "ethers";
import Erc20Abi from "../helper/erc20Abi";
import web3 from "web3";
import {toNumber} from "web3-utils";


export async function getContractMetaData(contractAddress: string) {
    const metaData = {
        name: '',
        symbol: '',
    }
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, Erc20Abi, signer);
    try {
        metaData.name = await contractInstance.name();
        metaData.symbol = await contractInstance.symbol();
    } catch (e) {
        throw new Error('unable to access contract through this address');
    }
    return metaData;
}

export async function getBalanceOfAddress(contractAddress: string, userAddress: string) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, Erc20Abi, signer);
    try {
        const data = await contractInstance.balanceOf(userAddress);
        return BigInt(data).toString();
    } catch (e) {
        throw new Error('unable to get balance through this address');
    }
}


export async function getAllowanceAndBalanceOf(contractAddress: string, ownerAddress: string, spenderAddress: string) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, Erc20Abi, signer);
    try {

        const allowanceData = await contractInstance.allowance(ownerAddress, spenderAddress);
        const balanceData = await contractInstance.balanceOf(spenderAddress);
        return {
            spenderBalance: BigInt(balanceData).toString(),
            allowance: BigInt(allowanceData).toString()
        }
    } catch (e) {
        throw new Error('connected address is not owner of token');
    }
}

export async function approveAllowance(contractAddress: string, spenderAddress: string, amount: string) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, Erc20Abi, signer);
    try {
        const transaction = await contractInstance.approve(spenderAddress, amount);
        return transaction.wait();
    } catch (e: any) {
        // throw new Error('connected address is not owner of token');
        throw new Error(e);
    }
}

export async function increaseDecreaseAllowance(contractAddress: string, spenderAddress: string, amount: string, isIncrease: boolean) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, Erc20Abi, signer);
    try {
        let transaction: any;
        if (isIncrease) {
            transaction = await contractInstance.increaseAllowance(spenderAddress, amount);
        } else {
            transaction = await contractInstance.decreaseAllowance(spenderAddress, amount);
        }
        return transaction.wait();
    } catch (e: any) {
        throw new Error(e)
    }
}
