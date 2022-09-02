import * as Yup from "yup";

export const SpenderSchema = Yup.object().shape({
    spenderAddress: Yup.string()
        .required('spender address is required')
        .test('len', 'invalid spender address',
            (val: any) => {
                if (val !== undefined) {
                    return val.length === 42;
                } else {
                    return false;
                }
            }),
    amount: Yup.number().typeError('amount must be number').required('No of tokens is required').min(1, 'Tokens must be greater than Zero')
        .test('fractional', 'amount should be non fractional',
            (val: any) => {
                if (val !== undefined) {
                    return (val % 1 === 0);
                } else {
                    return false;
                }
            }),
});
