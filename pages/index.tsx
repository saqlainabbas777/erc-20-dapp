import type {NextPage} from 'next'
import {Fragment, useContext} from "react";
import {AppContext} from "../context/appContext";
import WavyText from "../components/wavyText/wavyText";
import {motion} from 'framer-motion';

const button = `bg-lightGold font-josefinSans text-whiteOpa90 font-bold py-2 px-4 rounded-full`;
const placeSelfStartMxAuto = `place-self-start mx-auto`;
const Home: NextPage = () => {
    const {connectWallet} = useContext(AppContext);
    return (
        <Fragment>
            <div className={'grid min-h-screen place-items-center'}>
                <WavyText text="ERC-20 DAPP" replay={true}/>
                <motion.button
                    whileHover={{scale: 1.07}}
                    whileTap={{scale: 0.9}}
                    onClick={() => {
                        connectWallet()
                    }}
                    className={`${button}${placeSelfStartMxAuto}`}>
                    Connect Wallet
                </motion.button>
            </div>
        </Fragment>
    )
}

export default Home
