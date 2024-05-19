import React, {useState} from 'react';
import ReturnBack from "../ReturnBack/ReturnBack";
import CartItem from "./CartItem";
import Button, {ButtonTypes} from "../UI/Button/Button";
import CartModal from "./CartModal";
import {useAppSelector} from "../../hooks/hooks";
import {selectAllCartItems} from "../../store/slices/cartSlice";
import {selectProductByIds} from "../../store/slices/productsSlice";

const Cart = () => {
    const cartItems = useAppSelector(selectAllCartItems)

    const cartItemsProductsIds = cartItems.map(cartItem => cartItem.productId)
    const cartProducts = useAppSelector(state => selectProductByIds(state, cartItemsProductsIds))

    const totalPrice = cartItems.reduce((acc, item) => {
        const product = cartProducts.find(product => product!.id === item.productId);

        return acc + product!.price * item.quantity;
    }, 0)

    const [bonusesUsed, setBonusesUsed] = useState(false)

    const [modalOpened, setModalOpened] = useState(false)

    const cartIsEmpty = cartProducts.length === 0

    return (
        <>
            <section className="py-20 px-10">
                <div className="flex items-center justify-between">
                    <ReturnBack/>
                    <h2 className="font-bold text-3xl">Корзина</h2>
                    <div aria-hidden/>
                </div>
                <div className="grid grid-cols-[2fr,_1fr] max-w-[1170px] mx-auto mt-20 gap-x-[30px] items-start">
                    <div className="relative">
                        <div className="relative z-10 space-y-12">
                            {
                                !cartIsEmpty
                                ?
                                    cartProducts.map(product => (
                                        <CartItem key={product!.id} name={product!.name}
                                                  content={product!.content}
                                                  img={product!.img} price={product!.price} id={product!.id} category={product!.category}/>
                                    ))
                                    :
                                    <div className="text-center mt-20"><span className="font-bold text-xl">Корзина пуста</span></div>
                            }
                        </div>

                        <div
                            className="absolute size-[220px] border border-blue-accent left-[80px] top-[100px] -rotate-[23deg]"/>
                        <div
                            className="absolute w-[280px] h-[320px] border border-red-accent left-[80px] top-[100px] rotate-[43deg]"/>
                    </div>
                    <div className="bg-dark-secondary rounded px-6 py-8">
                        <div className="flex items-center gap-x-2 font-bold text-2xl"><span>Итого: {totalPrice}₽</span><span
                            className="line-through text-white/[.2]">15000₽</span></div>
                        <div className={`flex items-center gap-x-2.5 mt-3 mb-8 ${!cartIsEmpty && "cursor-pointer"}`}
                             onClick={() => {
                                 if (!cartIsEmpty) setBonusesUsed(!bonusesUsed)
                             }}>
                            {
                                !cartIsEmpty
                                    ?
                                    (
                                        bonusesUsed ?
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M6.75556 11.7333L13.0222 5.46667L11.7778 4.22222L6.75556 9.24444L4.22222 6.71111L2.97778 7.95556L6.75556 11.7333ZM1.77778 16C1.28889 16 0.87037 15.8259 0.522222 15.4778C0.174074 15.1296 0 14.7111 0 14.2222V1.77778C0 1.28889 0.174074 0.87037 0.522222 0.522222C0.87037 0.174074 1.28889 0 1.77778 0H14.2222C14.7111 0 15.1296 0.174074 15.4778 0.522222C15.8259 0.87037 16 1.28889 16 1.77778V14.2222C16 14.7111 15.8259 15.1296 15.4778 15.4778C15.1296 15.8259 14.7111 16 14.2222 16H1.77778ZM1.77778 14.2222H14.2222V1.77778H1.77778V14.2222Z"
                                                    fill="#4361EE"/>
                                            </svg>
                                            :
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M1.77778 16C1.28889 16 0.87037 15.8259 0.522222 15.4778C0.174074 15.1296 0 14.7111 0 14.2222V1.77778C0 1.28889 0.174074 0.87037 0.522222 0.522222C0.87037 0.174074 1.28889 0 1.77778 0H14.2222C14.7111 0 15.1296 0.174074 15.4778 0.522222C15.8259 0.87037 16 1.28889 16 1.77778V14.2222C16 14.7111 15.8259 15.1296 15.4778 15.4778C15.1296 15.8259 14.7111 16 14.2222 16H1.77778ZM1.77778 14.2222H14.2222V1.77778H1.77778V14.2222Z"
                                                    fill="white"/>
                                            </svg>
                                    )
                                    :
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.77778 16C1.28889 16 0.87037 15.8259 0.522222 15.4778C0.174074 15.1296 0 14.7111 0 14.2222V1.77778C0 1.28889 0.174074 0.87037 0.522222 0.522222C0.87037 0.174074 1.28889 0 1.77778 0H14.2222C14.7111 0 15.1296 0.174074 15.4778 0.522222C15.8259 0.87037 16 1.28889 16 1.77778V14.2222C16 14.7111 15.8259 15.1296 15.4778 15.4778C15.1296 15.8259 14.7111 16 14.2222 16H1.77778ZM1.77778 14.2222H14.2222V1.77778H1.77778V14.2222Z"
                                            fill="rgba(255, 255, 255, 0.2)"/>
                                    </svg>

                            }
                            <span className={`font-semibold text-sm ${bonusesUsed && "text-blue-accent"} ${cartIsEmpty && "text-white/[.2]"}`}>Списать бонусы</span>
                        </div>
                        <Button type={ButtonTypes.OUTLINED} onClick={() => setModalOpened(true)}
                                disabled={cartIsEmpty}>Перейти к
                            оформлению</Button>
                    </div>
                </div>
            </section>
            {
                modalOpened && <CartModal opened={modalOpened} closeModal={() => setModalOpened(false)}/>
            }
        </>
    );
};

export default Cart;