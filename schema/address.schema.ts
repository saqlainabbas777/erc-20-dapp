import * as Yup from "yup";

export const addressSchema = Yup.object().shape({
    address: Yup.string()
        .required('address is required')
        .test('len', 'invalid address',
            (val: any) => {
                if (val !== undefined) {
                    return val.length === 42;
                } else {
                    return false;
                }
            }),
});
