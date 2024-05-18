import React, {ChangeEvent, MouseEventHandler, useEffect, useRef, useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import focus = Simulate.focus;

interface Props {
    label: string;
    value: string;
    htmlFor: string;
    required?: boolean;
    type: string;
}

const InputWithChange: React.FC<Props> = ({label, value, htmlFor, required = false, type}) => {
    const [query, setQuery] = useState(value)

    const [editing, setEditing] = useState(false)
    const input = useRef(null)

    const handleEditButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        setEditing(true)
    }

    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        setEditing(false)
    }

    useEffect(() => {
        if (editing) {
            // @ts-ignore
            input.current!.focus()
        }
    }, [editing])

    const handleSetQuery = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return (
        <form>
            <label htmlFor={htmlFor} className="font-bold block ml-2 mb-3">{label} {required &&
                <span className="text-red-accent">*</span>}</label>
            <div className="flex items-center gap-x-6">
                <input id={htmlFor} type={type} value={query}
                       ref={input}
                       className={`bg-transparent w-[200px] md:w-[300px] outline-none px-6 py-4 border border-white rounded font-bold text-sm ${editing ? "text-white" : "text-white/[.2]"}`}
                       disabled={!editing}
                       onChange={handleSetQuery}
                />
                {
                    editing
                        ?
                        <button onClick={handleSubmitButton}>
                            <svg width="18" height="12" viewBox="0 0 24 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.39264 18L0 9.46778L2.09816 7.33472L8.39264 13.7339L21.9018 0L24 2.13306L8.39264 18Z"
                                    fill="white"/>
                            </svg>
                        </button>
                        :
                        <button onClick={handleEditButton}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.6208 0.25 13.8625 0.15C14.1042 0.05 14.3583 0 14.625 0C14.8917 0 15.15 0.05 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15 18 3.4C18 3.66667 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L4.25 18H0ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z"
                                    fill="white"/>
                            </svg>
                        </button>
                }
            </div>
        </form>
    );
};

export default InputWithChange;