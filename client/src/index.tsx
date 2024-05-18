import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import RootRoute from "./routes/RootRoute";
import {Provider} from "react-redux";
import store from "./store/store";
import AccountSettingsRoute from "./routes/AccountSettingsRoute";
import OrdersHistoryRoute from "./routes/OrdersHistoryRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootRoute />
    },
    {
        path: '/accountSettings',
        element: <AccountSettingsRoute />
    },
    {
        path: '/ordersHistory',
        element: <OrdersHistoryRoute />
    },
    {
        path: '/*',
        element: <Navigate to="/" replace />
    }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);