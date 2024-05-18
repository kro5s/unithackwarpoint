import React, {ChangeEvent} from 'react';

const SearchBar: React.FC<{
    className?: string;
    query: string;
    setQuery: (e: ChangeEvent<HTMLInputElement>) => void
}> = ({className, query, setQuery}) => {
    return (
        <div className={`flex items-center gap-x-6 max-w-[fit-content] px-10 ${className ? className : ""}`}>
            <svg className="flex-shrink-0" width="18" height="18" viewBox="0 0 18 18" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8 18V12H10V14H18V16H10V18H8ZM0 16V14H6V16H0ZM4 12V10H0V8H4V6H6V12H4ZM8 10V8H18V10H8ZM12 6V0H14V2H18V4H14V6H12ZM0 4V2H10V4H0Z"
                    fill="white"/>
            </svg>
            <form role="search" className="py-4 px-6 flex border border-white items-center rounded gap-x-6">
                <input type="text" placeholder="Введите название"
                       className="w-[200px] md:w-[480px] bg-transparent outline-none placeholder:text-white/[0.2] placeholder:font-bold"/>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.6 17.6327L10.3 11.4612C9.8 11.8531 9.225 12.1633 8.575 12.3918C7.925 12.6204 7.23333 12.7347 6.5 12.7347C4.68333 12.7347 3.14583 12.1184 1.8875 10.8857C0.629167 9.65306 0 8.14694 0 6.36735C0 4.58775 0.629167 3.08163 1.8875 1.84898C3.14583 0.616327 4.68333 0 6.5 0C8.31667 0 9.85417 0.616327 11.1125 1.84898C12.3708 3.08163 13 4.58775 13 6.36735C13 7.08571 12.8833 7.76326 12.65 8.4C12.4167 9.03673 12.1 9.6 11.7 10.0898L18 16.2612L16.6 17.6327ZM6.5 10.7755C7.75 10.7755 8.8125 10.3469 9.6875 9.48979C10.5625 8.63265 11 7.59184 11 6.36735C11 5.14286 10.5625 4.10204 9.6875 3.2449C8.8125 2.38775 7.75 1.95918 6.5 1.95918C5.25 1.95918 4.1875 2.38775 3.3125 3.2449C2.4375 4.10204 2 5.14286 2 6.36735C2 7.59184 2.4375 8.63265 3.3125 9.48979C4.1875 10.3469 5.25 10.7755 6.5 10.7755Z"
                        fill="white"/>
                </svg>
            </form>
        </div>
    );
};

export default SearchBar;