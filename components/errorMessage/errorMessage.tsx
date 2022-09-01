import React from "react";


interface IErrorMessageProps {
    message: string | undefined;
}

const ErrorMessage: React.FC<IErrorMessageProps> = ({message}) => {
    return (
        <p className={'font-josefinSans text-red mt-2'}>{message}</p>
    )
}

export default ErrorMessage;
