import React from 'react';
import {useNavigate} from "react-router-dom";

const ReturnBack = () => {
    const navigate = useNavigate()

    const handleReturnBack = () => navigate(-1)

    return (
        <div className="inline-flex items-center gap-x-3 cursor-pointer" onClick={handleReturnBack}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="white"/>
            </svg>
            <span className="font-semibold text-xl">Назад</span>
        </div>
    );
};

export default ReturnBack;