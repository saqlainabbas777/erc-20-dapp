import type {NextPage} from 'next'
import {Form, Formik, FormikHelpers} from "formik";
import {contractConnectSchema} from "../../schema/contractConnect.schema";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import Erc20Abi from '../../helper/erc20Abi';
import ErrorMessage from "../../components/errorMessage/errorMessage";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import {getContractMetaData} from "../../services/contractService";


const ContractDetail: NextPage = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView();
    const handleSubmit = async (values: any, formikHelpers: FormikHelpers<any>) => {
        getContractMetaData(values.contractAddress).then(res => {
            console.log('res', res);
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
        <div className={'grid min-h-screen place-items-center'}>
            <motion.div ref={ref} animate={controls}
                className="flex flex-col items-center w-full py-4 bg-bgCard rounded-lg border-none shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="flex flex-col justify-between w-full p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold font-josefinSans tracking-tight text-lightGold dark:text-white">Connect
                        Contract</h5>
                    <Formik
                        initialValues={{
                            contractAddress: '',
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={contractConnectSchema}
                    >
                        {({values, handleChange, handleBlur, errors, touched}) => (
                            <Form>
                                <div
                                    className={'flex md:flex-row xs:flex-col xs: gap-2 w-full justify-between items-start'}>
                                    <div className={'flex flex-col w-full'}>
                                        <input
                                            className={'bg-gray-100 border-none font-josefinSans text-sm rounded-lg  block md:w-6/6 xs:w-full p-2.5 dark:placeholder-gray-400'}
                                            type={'text'}
                                            name={'contractAddress'}
                                            value={values.contractAddress}
                                            placeholder={'0x2Rbt31r445Yhj7Ucdd3295blF'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.contractAddress && touched.contractAddress && (
                                                <ErrorMessage message={errors.contractAddress}/>
                                            )
                                        }
                                    </div>
                                    <button
                                        className={'bg-lightGold text-whiteOpa90 font-josefinSans font-bold py-2 px-6 rounded-full md:self-start xs:self-end'}
                                        type={'submit'}>Connect
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </motion.div>
        </div>
    )
}

export default ContractDetail;
