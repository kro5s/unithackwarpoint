import React, {useState} from 'react';
import ReturnBack from "../ReturnBack/ReturnBack";
import CartItem from "./CartItem";
import Button, {ButtonTypes} from "../UI/Button/Button";
import CartModal from "./CartModal";

const Cart = () => {
    const [bonusesUsed, setBonusesUsed] = useState(false)

    const [modalOpened, setModalOpened] = useState(false)

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
                            <CartItem name="Lorem Ipsum"
                                      content="Lorem ipsum dolor sit amet consectetur. Nibh lacus nunc amet molestie tincidunt. Mauris neque vulputate nisl tempus arcu at."
                                      img="" price="3000₽"/>
                            <CartItem name="Lorem Ipsum"
                                      content="Lorem ipsum dolor sit amet consectetur. Nibh lacus nunc amet molestie tincidunt. Mauris neque vulputate nisl tempus arcu at."
                                      img="" price="3000₽"/>
                            <CartItem name="Lorem Ipsum"
                                      content="Lorem ipsum dolor sit amet consectetur. Nibh lacus nunc amet molestie tincidunt. Mauris neque vulputate nisl tempus arcu at."
                                      img="" price="3000₽"/>
                        </div>

                        <div
                            className="absolute size-[220px] border border-blue-accent left-[80px] top-[100px] -rotate-[23deg]"/>
                        <div
                            className="absolute w-[280px] h-[320px] border border-red-accent -right-[90px] -bottom-[40px] rotate-[43deg]"/>
                    </div>
                    <div className="bg-dark-secondary rounded px-6 py-8">
                        <ul className="space-y-3 mb-6">
                            <li>1x Lorem Ipsum</li>
                            <li>1x Dolor sit</li>
                            <li>1x Lorem Amet</li>
                        </ul>
                        <div className="flex items-center gap-x-2 font-bold text-2xl"><span>Итого: 12000₽</span><span
                            className="line-through text-white/[.2]">15000₽</span></div>
                        <div className="flex items-center gap-x-2.5 mt-3 mb-8 cursor-pointer" onClick={() => setBonusesUsed(!bonusesUsed)}>
                            {
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
                            }
                            <span className={`font-semibold text-sm ${bonusesUsed && "text-blue-accent"}`}>Списать бонусы</span>
                        </div>
                        <Button type={ButtonTypes.OUTLINED} onClick={() => setModalOpened(true)}>Перейти к оформлению</Button>
                    </div>
                </div>
            </section>
            {
                modalOpened && <CartModal opened={modalOpened} closeModal={() => setModalOpened(false)} />
            }
        </>
    );
};

export default Cart;