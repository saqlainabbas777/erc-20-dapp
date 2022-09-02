import type {NextPage} from 'next'
import {useContext, useEffect, Fragment} from "react";
import {AppContext} from "../../context/appContext";
import {useRouter} from "next/router";
import ErrorMessage from "../../components/errorMessage/errorMessage";
import {Form, Formik} from "formik";
import {SpenderSchema} from "../../schema/spender.schema";

const spenderContainer = `grid grid-cols-1 grid-flow-row place-items-center min-h-screen xs:mt-3 sm:mt-0`;
const spenderCardsContainer = `bg-bgCard rounded-lg shadow-xl w-4/6`;
const contractDetailGrid = `grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xs:gap-y-2 sm:gap-y-2 grid-flow-row gap-x-4 py-6 px-4`;
const innerCardContainer = `bg-gradBlue rounded-lg shadow-xl place-items-center py-4 px-6`;
const innerCardData = `font-josefinSans text-2xl text-white`;
const innerCardDesc = `font-josefinSans text-lg text-greyShade`;
const spenderDetailContainer = `grid xs:grid-row-1 sm:grid-cols-1 md:grid-row-1 xs:gap-y-2 sm:gap-y-2 md:gap-y-4 grid-flow-row gap-x-4 py-6 px-4`;
const spenderDetailCardsContainer = `grid xs:grid-row-1 sm:grid-cols-1 md:grid-cols-2 xs:gap-y-2 sm:gap-y-2 md:gap-y-2 md:gap-x-8`;
const spenderDetailButtonContainer = `flex xs:flex-col sm:flex-row xs:justify-around md:justify-end items-center gap-1 mt-6 mb-2`;
const button = ` text-whiteOpa90 font-josefinSans font-bold py-2 px-6 rounded-full md:self-start xs:self-end`;
const decreaseAllowanceBtn = `bg-gradBlue ${button}`;
const increaseAllowanceBtn = `bg-greyShade ${button}`;
const allowanceBtn = `bg-lightGold ${button}`;
const spenderDetailHeader = `mb-2 text-2xl font-bold font-josefinSans tracking-tight text-lightGold dark:text-white mb-6`;
const spenderInputsContainer = `flex md:flex-row xs:flex-col xs:gap-2 md:w-full xs:w-6/6 justify-between items-start mb-6`;
const spenderAddressContainer = `flex flex-col w-full`;
const spenderAmountContainer = `flex flex-col w-full sm:6/6 md:w-3/6`;
const input = `bg-gray-100 border-none font-josefinSans text-sm rounded-lg  block p-2.5 dark:placeholder-gray-400`;
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

    const handleSubmit = async (values: any) => {
    }
    return (
        <Fragment>
            <div className={spenderContainer}>
                <div className={spenderCardsContainer}>
                    <div
                        className={contractDetailGrid}>
                        <div className={innerCardContainer}>
                            <h2 className={innerCardData}>GC</h2>
                            <h2 className={innerCardDesc}>Token Symbol</h2>
                        </div>
                        <div className={innerCardContainer}>
                            <h2 className={innerCardData}>Cloud Sharks</h2>
                            <h2 className={innerCardDesc}>Token Name</h2>
                        </div>
                        <div className={innerCardContainer}>
                            <h2 className={innerCardData}>104</h2>
                            <h2 className={innerCardDesc}>Your Balance</h2>
                        </div>
                    </div>
                </div>
                <div className={spenderCardsContainer}>
                    <div
                        className={spenderDetailContainer}>
                        <Formik
                            initialValues={{
                                spenderAddress: '',
                                amount: ''
                            }}
                            onSubmit={handleSubmit}
                            validationSchema={SpenderSchema}
                        >
                            {({values, handleChange, handleBlur, errors, touched}) => (
                                <Form>
                                    <h5 className={spenderDetailHeader}>Spender Detail</h5>
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
                                        className={spenderDetailCardsContainer}>
                                        <div
                                            className={innerCardContainer}>
                                            <h2 className={innerCardData}>GC</h2>
                                            <h2 className={innerCardDesc}>Token Symbol</h2>
                                        </div>
                                        <div
                                            className={innerCardContainer}>
                                            <h2 className={innerCardData}>Cloud Sharks</h2>
                                            <h2 className={innerCardDesc}>Token Name</h2>
                                        </div>
                                    </div>
                                    <div
                                        className={spenderDetailButtonContainer}>
                                        <button
                                            className={decreaseAllowanceBtn}
                                            type={'submit'}>Decrease Allowance
                                        </button>
                                        <button
                                            className={increaseAllowanceBtn}
                                            type={'submit'}>Increase Allowance
                                        </button>
                                        <button
                                            className={allowanceBtn}
                                            type={'submit'}>Allowance
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SpenderDetail;
