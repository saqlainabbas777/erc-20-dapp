import type {NextPage} from 'next'
import {useContext, useEffect} from "react";
import {AppContext} from "../../context/appContext";
import {useRouter} from "next/router";
const SpenderDetail: NextPage = () => {
    const router = useRouter();
    const {contractMetaData} = useContext(AppContext);
    useEffect(() => {
        if (contractMetaData.name === null ||
            contractMetaData.symbol === null ||
            contractMetaData.contractAddress === null) {
            // route back to the contract detail page
            router.push('/contractDetail').then();
        }
    }, [])
    return (
        <div></div>
    )
}

export default SpenderDetail;
