import React, {ChangeEvent} from 'react';

interface Props {
    label: string;
    placeholder: string;
    type: string;
    query: string;
    setQuery: (e: ChangeEvent<HTMLInputElement>) => void;
    htmlFor: string;
}

const Input: React.FC<Props> = ({label, placeholder, type, query, setQuery, htmlFor}) => {
    return (
        <div>
            <label className="block ml-2 mb-3 font-bold" htmlFor={htmlFor}>{label}</label>
            <input
                className="bg-transparent w-[200px] md:w-[300px] outline-none px-6 py-4 border border-white rounded font-bold text-sm placeholder:text-white/[.2]"
                id={htmlFor} type={type} placeholder={placeholder} onChange={setQuery} value={query}/>
        </div>
    );
};

export default Input;