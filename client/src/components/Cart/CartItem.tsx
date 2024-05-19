import React, {useState} from 'react';
import {IProduct} from "../../types/models";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {cartActions, selectCartItemByProductId} from "../../store/slices/cartSlice";



const CartItem: React.FC<IProduct> = ({ id, name, content, price, img }) => {
    const dispatch = useAppDispatch()

    const cartItem = useAppSelector(state => selectCartItemByProductId(state, id))

    const handleDeleteFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        dispatch(cartActions.deleteItem(id))
    }
    
    const handleQuantityChange = (fn: (a: number, b: number) => number) => {
        return (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            
            const newQuantity = fn(cartItem!.quantity, 1)
            
            dispatch(cartActions.changeQuantity({ id, quantity: newQuantity }))
        }
    }

    return (
        <div className="p-6 bg-dark-secondary shadow rounded flex">
            <img src={img} alt={name} className="size-[140px] rounded object-cover"/>
            <div className="max-w-[30%] ml-6 mr-auto">
                <div className="my-3"><span className="font-bold text-xl">{name}</span></div>
                <p className="line-clamp-3">{content}</p>
            </div>
            <div className="flex flex-col items-end">
                <div className="mb-auto"><span className="text-2xl font-bold">{price * cartItem!.quantity}₽</span></div>
                <div className="flex items-center gap-x-6">
                    <div className="flex gap-x-3 items-center border border-white rounded py-1 px-2 font-semibold">
                        <button onClick={handleQuantityChange((a: number, b: number) => a - b)}><span>-</span></button>
                        <span>{cartItem!.quantity}</span>
                        <button onClick={handleQuantityChange((a: number, b: number) => a + b)}><span>+</span></button>
                    </div>
                    <button onClick={handleDeleteFromCart}>
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                                fill="white"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;