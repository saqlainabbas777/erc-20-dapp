import type {NextPage} from 'next'
import {Form, Formik} from "formik";
import {addressSchema} from "../../schema/address.schema";
import ErrorMessage from "../../components/errorMessage/errorMessage";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useContext, useEffect, Fragment} from "react";
import {getContractMetaData} from "../../services/contractService";
import {AppContext} from "../../context/appContext";
import {ContractMetaData} from "../../helper/types";
import {useRouter} from "next/router";
import Header from "../../components/header/header";
import {toast} from "react-toastify";

const contractDetailContainer = `grid min-h-80 place-items-center`;
const cardContainer = `flex flex-col items-center w-full py-4 bg-bgCard rounded-lg border-none shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`;
const cardHeader = `mb-2 text-2xl font-bold font-josefinSans tracking-tight text-lightGold dark:text-white`;
const cardFlex = `flex flex-col justify-between w-full p-4 leading-normal`;
const formContainer = `flex md:flex-row xs:flex-col xs: gap-2 w-full justify-between items-start`;
const addressInput = `bg-gradBlue text-white outline-0 border-none font-josefinSans text-sm rounded-lg  block md:w-6/6 xs:w-full p-2.5 dark:placeholder-gray-400`;
const inputContainer = `flex flex-col w-full`;
const contractBtn = `bg-lightGold text-whiteOpa90 font-josefinSans font-bold py-2 px-6 rounded-md md:self-start xs:self-end`;
const ContractDetail: NextPage = () => {
    const router = useRouter();
    const {setMetaData} = useContext(AppContext);
    const controls = useAnimation();
    const [ref, inView] = useInView();

    const handleSubmit = async (values: any) => {
        const id = toast.loading(`Fetching Contract Data...`);
        // get the metaData details from blockchain
        getContractMetaData(values.address).then(metaData => {
            toast.update(id, {
                render: `Contract Data Fetched`,
                type: "success",
                isLoading: false,
                autoClose: 3000
            });
            // put metaData on context and route to the next page
            const contractMetaData: ContractMetaData = {
                name: metaData.name,
                symbol: metaData.symbol,
                contractAddress: values.address
            };
            setMetaData(contractMetaData);
            // route to next page
            router.push('/spenderDetail').then();
        }).catch(err => {
            toast.update(id, {
                render: `Unable to access contract through this address`,
                type: "error",
                isLoading: false,
                autoClose: 3000
            });
        })
    };


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
                    delay: .6,
                }
            }).then();
        }
    }, [controls, inView])
    return (
        <Fragment>
            <Header/>
            <div className={contractDetailContainer}>
                <motion.div ref={ref} animate={controls}
                            className={cardContainer}>
                    <div className={cardFlex}>
                        <h5 className={cardHeader}>Connect
                            Contract</h5>
                        <Formik
                            initialValues={{
                                address: '',
                            }}
                            onSubmit={handleSubmit}
                            validationSchema={addressSchema}
                        >
                            {({values, handleChange, handleBlur, errors, touched}) => (
                                <Form>
                                    <div
                                        className={formContainer}>
                                        <div className={inputContainer}>
                                            <input
                                                className={addressInput}
                                                type={'text'}
                                                name={'address'}
                                                value={values.address}
                                                placeholder={'0x2Rbt31r445Yhj7Ucdd3295blF'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.address && touched.address && (
                                                    <ErrorMessage message={errors.address}/>
                                                )
                                            }
                                        </div>
                                        <button
                                            className={contractBtn}
                                            type={'submit'}>Connect
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

export default ContractDetail;
