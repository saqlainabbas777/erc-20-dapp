import Web3Modal from "web3modal";
import {ethers} from "ethers";
import Erc20Abi from "../helper/erc20Abi";
import web3 from "web3";


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
        console.log(e);
        throw new Error('unable to access contract through this address');
    }
    return metaData;
}
