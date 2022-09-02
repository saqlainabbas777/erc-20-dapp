import React, {useContext} from "react";
import Tippy from "@tippyjs/react";
import {AppContext} from "../../context/appContext";
import { motion } from "framer-motion";
import {useInView} from "react-intersection-observer";

const headerContainer = `flex flex-row self-end font-josefinSans items-center justify-between`;
const logo = `px-4 m-3 text-lightGold xs:text-lg sm:text-2xl cursor-pointer`;
const walletAddressContainer = `bg-bgCard rounded-md py-4 px-4 m-3 text-whiteOpa90 text-lg cursor-pointer`;
const Header: React.FC<any> = () => {
    const [ref, inView] = useInView();
    const {userAddress} = useContext(AppContext);
    return (
        <header ref={ref} className={headerContainer}>
            <motion.h2
                initial={{opacity: 0, translateX: -50}}
                animate={inView ? {opacity: 1, translateX: 0} : {}}
                transition={{duration: 0.3, delay: 0.6}}
                className={logo}>ERC-20 Dapp</motion.h2>
            <Tippy content={userAddress} placement={'bottom'}>
                <motion.div
                    initial={{opacity: 0, translateX: +50}}
                    animate={inView ? {opacity: 1, translateX: 0} : {}}
                    transition={{duration: 0.3, delay: 0.6}}
                    className={walletAddressContainer}>{
                    userAddress !== undefined && userAddress?.length > 5 ? userAddress?.substring(0, 7) + '....' + userAddress?.substring(userAddress?.length - 5, userAddress?.length) :
                        userAddress
                }</motion.div>
            </Tippy>
        </header>
    )
}

export default Header;
