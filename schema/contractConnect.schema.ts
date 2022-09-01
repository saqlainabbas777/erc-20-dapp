import * as Yup from "yup";

export const contractConnectSchema = Yup.object().shape({
    contractAddress: Yup.string()
        .required('contract address is required')
        .test('len', 'invalid contract address',
            (val: any) => {
                if (val !== undefined) {
                    return val.length === 42;
                } else {
                    return false;
                }
            }),
});
