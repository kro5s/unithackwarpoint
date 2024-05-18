import React, {useEffect, useRef, useState} from 'react';
import Layout from "../components/Layout/Layout";
import Catalog from "../components/Catalog/Catalog";
import Alert from "../components/Alert/Alert";

const RootRoute = () => {
    const [alertVisible, setAlertVisible] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setAlertVisible(false)
        }, 2000)
    }, [alertVisible])

    return (
        <Layout>
            <Catalog />
            {
                alertVisible ? <Alert /> : <Alert className="-translate-x-[100vw] transition" />
            }
        </Layout>
    );
};

export default RootRoute;