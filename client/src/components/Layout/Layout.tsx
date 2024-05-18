import React, {useEffect} from 'react';
import Header from "../Header/Header";
import {useLocation} from "react-router-dom";

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
    const location = useLocation()

    useEffect(() => {
        window.scroll(0, 0)
    }, [location.pathname])

    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    );
};

export default Layout;