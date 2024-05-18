import React from 'react';

export enum ButtonTypes {
    OUTLINED
}

const Button: React.FC<{ type?: ButtonTypes, className?: string, children: React.ReactNode, onClick?: () => void }> = ({ type, className, children, onClick }) => {
    let buttonClasses = "py-2 px-4 rounded font-bold text-sm transition "

    switch (type) {
        case ButtonTypes.OUTLINED: {
            buttonClasses += "border border-white hover:bg-white hover:text-dark-bg "
            break;
        }
        default: buttonClasses += "bg-red-accent hover:bg-[#C21A1A] "
    }

    return (
        <button className={buttonClasses + (className ? className : '')} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;