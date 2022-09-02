import type {NextPage} from 'next'
import {useContext, useEffect, Fragment, useState} from "react";
import {AppContext} from "../../context/appContext";
import {useRouter} from "next/router";
import ErrorMessage from "../../components/errorMessage/errorMessage";
import Header from "../../components/header/header";
import {Form, Formik} from "formik";
import {SpenderSchema} from "../../schema/spender.schema";
import {
    approveAllowance,
    getAllowanceAndBalanceOf,
    getBalanceOfAddress, increaseDecreaseAllowance,
} from "../../services/contractService";
import {toastMessage, toastTransactionProcess} from "../../helper/helperMethod";
import {addressSchema} from "../../schema/address.schema";
import {toast} from "react-toastify";
import {SpenderData} from "../../helper/types";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";


const spenderContainer = `flex flex-col gap-y-6 items-center justify-center mt-8`;
const spenderCardsContainer = `bg-bgCard rounded-lg shadow-xl w-4/6`;
const contractDetailGrid = `grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xs:gap-y-2 sm:gap-y-2 grid-flow-row gap-x-4 py-6 px-4`;
const innerCardContainer = `bg-gradBlue rounded-lg shadow-xl place-items-center py-4 px-6`;
const innerCardData = `font-josefinSans text-1xl text-white`;
const innerCardDesc = `font-josefinSans text-lg text-greyShade`;
const spenderDetailContainer = `grid xs:grid-row-1 sm:grid-cols-1 md:grid-row-1 xs:gap-y-2 sm:gap-y-2 md:gap-y-4 grid-flow-row gap-x-4 py-6 px-4`;
const spenderDetailCardsContainer = `grid xs:grid-row-1 sm:grid-cols-1 md:grid-cols-2 xs:gap-y-2 sm:gap-y-2 md:gap-y-2 md:gap-x-8`;
const spenderDetailButtonContainer = `flex xs:flex-col sm:flex-row xs:justify-around md:justify-end items-center gap-1 mt-6 mb-2`;
const button = ` text-whiteOpa90 font-josefinSans font-bold rounded-md py-2 px-6 md:self-start xs:self-end`;
const decreaseAllowanceBtn = `bg-gradBlue ${button}`;
const increaseAllowanceBtn = `bg-greyShade ${button}`;
const allowanceBtn = `bg-lightGold ${button}`;
const spenderDetailHeader = `mb-2 text-2xl font-bold font-josefinSans tracking-tight text-lightGold dark:text-white mb-6`;
const spenderInputsContainer = `flex md:flex-row xs:flex-col xs:gap-2 md:w-full xs:w-6/6 justify-between items-start mb-6`;
const spenderAddressContainer = `flex flex-col w-full`;
const spenderAmountContainer = `flex flex-col w-full sm:6/6 md:w-3/6`;
const input = `bg-gradBlue text-white outline-0 border-none font-josefinSans text-sm rounded-lg  block p-2.5 dark:placeholder-gray-400`;
const SpenderDetail: NextPage = () => {
    const router = useRouter();
    const {userAddress, contractMetaData} = useContext(AppContext);
    const [spenderData, setSpenderData] = useState<SpenderData>({
        userBalance: '',
        spenderAllowance: '',
        spenderBalance: ''
    });
    const controls = useAnimation();
    const getAllowanceControls = useAnimation();
    const [ref, inView] = useInView();
    useEffect(() => {
        if (contractMetaData.name === null ||
            contractMetaData.symbol === null ||
            contractMetaData.contractAddress === null) {
            // route back to the contract detail page
            router.push('/contractDetail').then();
        } else {
            getBalanceOfAddress(contractMetaData.contractAddress, userAddress).then(res => {
                setSpenderData({...spenderData, userBalance: res})
            }).catch(err => {
                toastMessage(err.message);
            });
        }
    }, [])

    useEffect(() => {
        if (inView) {
            controls.set({
                y: +50,
                opacity: 0,
                transition: {}
            });
            controls.start({
                y: 0,
                opacity: 1,
                transition: {
                    type: "bounceIn",
                    duration: .5,
                    delay: .4,
                }
            }).then();
        }
    }, [controls ,inView])

    const handleSetAllowance = async (values: any) => {
        const id = toast.loading('giving allowance to spender');
        if (contractMetaData.contractAddress !== null) {
            approveAllowance(contractMetaData.contractAddress, values.spenderAddress, values.amount).then(res => {
                if (res !== undefined) {
                    toast.update(id, {render: "allowance given", type: "success", isLoading: false, autoClose: 3000});
                    setSpenderData({...spenderData, spenderAllowance: values.amount})
                }
            }).catch(err => {
                toast.update(id, {
                    render: "Error in giving allowance Transaction",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000
                });
            });
        }
    }

    const handleIncreaseDecreaseAllowance = async (values: any, increaseAllowance: boolean) => {
        const id = toast.loading(`${increaseAllowance ? 'increasing' : 'decreasing'} allowance to spender`);
        if (contractMetaData.contractAddress !== null) {
            increaseDecreaseAllowance(contractMetaData.contractAddress, values.spenderAddress, values.amount, increaseAllowance).then(res => {
                if (res !== undefined) {
                    toast.update(id, {
                        render: `allowance ${increaseAllowance ? 'increased' : 'decreased'}`,
                        type: "success",
                        isLoading: false,
                        autoClose: 3000
                    });
                    let adjustedAmount = increaseAllowance ? parseInt(spenderData.spenderAllowance) + values.amount : parseInt(spenderData.spenderAllowance) - values.amount;
                    setSpenderData({...spenderData, spenderAllowance: adjustedAmount.toString()})
                }
            }).catch(err => {
                toast.update(id, {
                    render: `Error in ${increaseAllowance ? 'increased' : 'decreased'} allowance Transaction`,
                    type: "error",
                    isLoading: false,
                    autoClose: 3000
                });
            })
        }
    }


    const handleGetAllowance = async (values: any) => {
        if (contractMetaData.contractAddress !== null) {
            getAllowanceAndBalanceOf(contractMetaData.contractAddress, userAddress, values.address).then(res => {
                setSpenderData({...spenderData, spenderAllowance: res.allowance, spenderBalance: res.spenderBalance});
            }).catch(err => {
            })
            await toastTransactionProcess(getAllowanceAndBalanceOf(contractMetaData.contractAddress, userAddress, values.address), {
                pending: 'Fetching spender allowance...',
                success: 'Spender allowance Fetched',
                error: 'Error in fetching spender allowance'
            });
        }
    }
    return (
        <Fragment>
            <Header/>
            <div ref={ref} className={spenderContainer}>
                <motion.div
                    initial={{opacity: 0, translateX: +50}}
                    animate={inView ? {opacity: 1, translateX: 0} : {}}
                    transition={{duration: 0.3, delay: 0.6}}
                    className={spenderCardsContainer}>
                    <div
                        className={contractDetailGrid}>
                        <div className={innerCardContainer}>
                            <h2 className={innerCardData}>{contractMetaData.symbol}</h2>
                            <h2 className={innerCardDesc}>Token Symbol</h2>
                        </div>
                        <div className={innerCardContainer}>
                            <h2 className={innerCardData}>{contractMetaData.name}</h2>
                            <h2 className={innerCardDesc}>Token Name</h2>
                        </div>
                        <div className={innerCardContainer}>
                            <h2 className={innerCardData}>{spenderData.userBalance}</h2>
                            <h2 className={innerCardDesc}>Your Balance</h2>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{opacity: 0, translateX: -50}}
                    animate={inView ? {opacity: 1, translateX: 0} : {}}
                    transition={{duration: 0.3, delay: 0.6}}
                    className={spenderCardsContainer}>
                    <div
                        className={spenderDetailContainer}>
                        <Formik
                            initialValues={{
                                address: '',
                            }}
                            onSubmit={handleGetAllowance}
                            validationSchema={addressSchema}
                        >
                            {({values, handleChange, handleBlur, errors, touched}) => (
                                <Form>
                                    <h5 className={spenderDetailHeader}>Get Allowance</h5>
                                    <div
                                        className={spenderInputsContainer}>
                                        <div className={spenderAddressContainer}>
                                            <input
                                                className={input}
                                                type={'text'}
                                                name={'address'}
                                                value={values.address}
                                                placeholder={'spender Address'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.address && touched.address && (
                                                    <ErrorMessage message={errors.address}/>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {
                                        spenderData.spenderAllowance !== '' &&
                                        spenderData.spenderBalance !== '' &&
                                        values.address !== '' &&
                                        <motion.div animate={controls} className={spenderDetailCardsContainer}>
                                            <div
                                                className={innerCardContainer}>
                                                <h2 className={innerCardData}>{spenderData.spenderAllowance}</h2>
                                                <h2 className={innerCardDesc}>spender current allowance</h2>
                                            </div>
                                            <div
                                                className={innerCardContainer}>
                                                <h2 className={innerCardData}>{spenderData.spenderBalance}</h2>
                                                <h2 className={innerCardDesc}>spender current balance</h2>
                                            </div>
                                        </motion.div>
                                    }
                                    <div
                                        className={spenderDetailButtonContainer}>
                                        <button
                                            className={allowanceBtn}
                                            type={'submit'}>Get Allowance
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </motion.div>
                <motion.div
                    initial={{opacity: 0, translateX: +50}}
                    animate={inView ? {opacity: 1, translateX: 0} : {}}
                    transition={{duration: 0.3, delay: 0.6}}
                    className={spenderCardsContainer}>
                    <div
                        className={spenderDetailContainer}>
                        <Formik
                            initialValues={{
                                spenderAddress: '',
                                amount: ''
                            }}
                            onSubmit={() => {
                            }}
                            validationSchema={SpenderSchema}
                        >
                            {({values, handleChange, handleBlur, errors, touched, validateForm}) => (
                                <Form>
                                    <h5 className={spenderDetailHeader}>Set Allowance</h5>
                                    <div
                                        className={spenderInputsContainer}>
                                        <div className={spenderAddressContainer}>
                                            <input
                                                className={input}
                                                type={'text'}
                                                name={'spenderAddress'}
                                                value={values.spenderAddress}
                                                placeholder={'spender Address'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.spenderAddress && touched.spenderAddress && (
                                                    <ErrorMessage message={errors.spenderAddress}/>
                                                )
                                            }
                                        </div>
                                        <div className={spenderAmountContainer}>
                                            <input
                                                className={input}
                                                type={'number'}
                                                name={'amount'}
                                                value={values.amount}
                                                placeholder={`20 ${contractMetaData.symbol}`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.amount && touched.amount && (
                                                    <ErrorMessage message={errors.amount}/>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div
                                        className={spenderDetailButtonContainer}>
                                        <button
                                            onClick={() => {
                                                validateForm().then((res) => {
                                                    if (!res.amount && !res.spenderAddress) {
                                                        handleIncreaseDecreaseAllowance(values, false).then()
                                                    }
                                                })
                                            }}
                                            type={'submit'}
                                            className={decreaseAllowanceBtn}
                                        >Decrease Allowance
                                        </button>
                                        <button
                                            onClick={() => {
                                                validateForm().then((res) => {
                                                    if (!res.amount && !res.spenderAddress) {
                                                        handleIncreaseDecreaseAllowance(values, true).then()
                                                    }
                                                })
                                            }}
                                            type={'submit'}
                                            className={increaseAllowanceBtn}
                                        >Increase Allowance
                                        </button>
                                        <button
                                            onClick={() => {
                                                validateForm().then((res) => {
                                                    if (!res.amount && !res.spenderAddress) {
                                                        handleSetAllowance(values).then();
                                                    }
                                                })
                                            }}
                                            type={'submit'}
                                            className={allowanceBtn}
                                        >Set Allowance
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </motion.div>
            </div>
        </Fragment>
    )
}

export default SpenderDetail;
