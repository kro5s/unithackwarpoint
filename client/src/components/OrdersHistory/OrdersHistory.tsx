import React from 'react';
import ReturnBack from "../ReturnBack/ReturnBack";
import OrderHistoryCard from "./OrderHistoryCard";

const OrdersHistory = () => {
    return (
        <section className="py-20 px-10">
            <div className="flex items-center justify-between">
                <ReturnBack/>
                <h2 className="font-bold text-3xl">История заказов</h2>
                <div aria-hidden/>
            </div>
            <div className="mx-auto max-w-[650px] pl-20 mt-16 relative">
                <div className="z-10 space-y-12 relative">
                    <OrderHistoryCard orderId="124112-2434" orderPrice="9000₽" />
                    <OrderHistoryCard orderId="124112-2434" orderPrice="9000₽" />
                    <OrderHistoryCard orderId="124112-2434" orderPrice="9000₽" />
                    <OrderHistoryCard orderId="124112-2434" orderPrice="9000₽" />
                </div>

                <div className="size-[220px] rounded-full border border-red-accent absolute bottom-[100px] left-0" aria-hidden></div>
                <div className="absolute -right-[100px] top-[40px]"
                     aria-hidden>
                    <svg width="238" height="251" viewBox="0 0 238 251" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.00243 161.562L195.408 1.19612L237.086 249.739L1.00243 161.562Z" stroke="#4361EE"/>
                    </svg>

                </div>
            </div>
        </section>
    );
};

export default OrdersHistory;