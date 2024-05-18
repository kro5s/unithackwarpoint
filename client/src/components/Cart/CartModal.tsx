import React, {ChangeEvent, useState} from 'react';
import {useHideScroll} from "../../hooks/hooks";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

const CartModal: React.FC<{ opened: boolean, closeModal: () => void }> = ({ opened, closeModal }) => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')

    const handleSetQuery = (setter: React.Dispatch<React.SetStateAction<string>>) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value)
        }
    }

    useHideScroll([opened])

    return (
        <div className="h-full z-50 fixed left-0 right-0 top-0 bottom-0 bg-white/[.2] flex justify-center overflow-y-scroll" onMouseDown={closeModal}>
            <div className="bg-dark-bg my-20 h-fit rounded-xl shadow py-16 px-24" onMouseDown={(e) => e.stopPropagation()}>
                <div className="text-center"><span className="font-bold text-3xl">Оформление заказа</span></div>
                <div className="space-y-8 mt-12 mb-24">
                    <Input label="Имя" placeholder="Иван" type="text" query={name} setQuery={handleSetQuery(setName)} htmlFor="ord-name" />
                    <Input label="Фамилия" placeholder="Иванов" type="text" query={surname} setQuery={handleSetQuery(setSurname)} htmlFor="ord-surname" />
                    <Input label="Почта" placeholder="example@gmail.com" type="email" query={email} setQuery={handleSetQuery(setEmail)} htmlFor="ord-email" />
                    <Input label="Телефон" placeholder="+7 (999) 999-99-99" type="tel" query={tel} setQuery={handleSetQuery(setTel)} htmlFor="ord-tel" />
                </div>
                <div className="text-center">
                    <Button>Перейти к оплате</Button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;