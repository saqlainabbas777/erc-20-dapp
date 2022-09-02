import React, {useContext} from "react";
import Tippy from "@tippyjs/react";
import {AppContext} from "../../context/appContext";

const headerContainer = `flex flex-row self-end font-josefinSans items-center justify-between`;
const logo = `px-4 m-3 text-lightGold xs:text-lg sm:text-2xl cursor-pointer`;
const walletAddressContainer = `bg-bgCard rounded-md py-4 px-4 m-3 text-whiteOpa90 text-lg cursor-pointer`;
const Header: React.FC<any> = () => {
    const {userAddress} = useContext(AppContext);
    return (
        <header className={headerContainer}>
            <h2 className={logo}>ERC-20 Dapp</h2>
            <Tippy content={userAddress} placement={'bottom'}>
                <div className={walletAddressContainer}>{
                    userAddress !== undefined && userAddress?.length > 5 ? userAddress?.substring(0, 7) + '....' + userAddress?.substring(userAddress?.length - 5, userAddress?.length) :
                        userAddress
                }</div>
            </Tippy>
        </header>
    )
}

export default Header;
