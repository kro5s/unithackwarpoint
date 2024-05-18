import React from 'react';
import ReturnBack from "../ReturnBack/ReturnBack";
import InputWithChange from "../UI/InputWithChange/InputWithChange";
import Button, {ButtonTypes} from "../UI/Button/Button";

const AccountSettings = () => {
    return (
        <section className="py-20 px-10">
            <div className="flex items-center justify-between">
                <ReturnBack />
                <h2 className="font-bold text-3xl">Управление аккаунтом</h2>
                <div aria-hidden/>
            </div>
            <div className="pt-16 max-w-[396px] mx-auto pl-24 relative">
                <div className="relative z-10 space-y-12">
                    <InputWithChange label="Имя" value="Иван" htmlFor="ac-set-name" required type="text"/>
                    <InputWithChange label="Фамилия" value="Иванов" htmlFor="ac-set-surname" required type="text"/>
                    <InputWithChange label="Почта" value="example@gmail.com" htmlFor="ac-set-email" type="emal"/>
                    <InputWithChange label="Телефон" value="+7 (999) 999-99-99" htmlFor="ac-set-number" type="tel"/>

                    <div className="flex items-center justify-between">
                        <Button>Выйти</Button>
                        <Button type={ButtonTypes.OUTLINED}>Удалить аккаунт</Button>
                    </div>
                </div>

                <div className="absolute -left-[200px] top-[200px] -rotate-[135deg]" aria-hidden>
                    <svg width="203" height="204" viewBox="0 0 203 204" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                            d="M62.3721 1.53135L115.081 57.5642L115.33 57.8288L115.658 57.6738L185.236 24.86L148.234 92.304L148.059 92.6225L148.308 92.8871L201.017 148.92L125.439 134.57L125.082 134.502L124.908 134.82L87.9052 202.264L78.1983 125.952L78.1524 125.591L77.7955 125.523L2.21808 111.173L71.7963 78.3595L72.1249 78.2046L72.079 77.8442L62.3721 1.53135Z"
                            stroke="#4361EE"/>
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default AccountSettings;