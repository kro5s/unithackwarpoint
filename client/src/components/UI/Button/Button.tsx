import React from 'react';

export enum ButtonTypes {
    OUTLINED
}

const Button: React.FC<{
    type?: ButtonTypes,
    className?: string,
    children: React.ReactNode,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean
}> = ({type, className, children, onClick, disabled = false}) => {
    let buttonClasses = "py-2 px-4 rounded font-bold text-sm transition "

    switch (type) {
        case ButtonTypes.OUTLINED: {
            buttonClasses += `border ${disabled ? "border-white/[.2] text-white/[.2]" : "border-white"} ${!disabled && "hover:bg-white hover:text-dark-bg"} `
            break;
        }
        default:
            buttonClasses += "bg-red-accent hover:bg-[#C21A1A] "
    }

    return (
        <button className={buttonClasses + (className ? className : '')} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;