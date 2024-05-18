import React from 'react';
import {useHideScroll} from "../../hooks/hooks";
import {IProduct} from "../../types/models";
import Button, {ButtonTypes} from "../UI/Button/Button";

type Props = IProduct & { opened: boolean, closeModal: () => void }

const CardModal: React.FC<Props> = ({ opened, closeModal, category, img, content, id, name, price }) => {
    useHideScroll([opened])

    return (
        <div
            className="h-full z-50 fixed left-0 right-0 top-0 bottom-0 bg-white/[.2] flex justify-center overflow-y-scroll"
            onMouseDown={closeModal}>
            <div className="relative bg-dark-bg my-20 h-fit rounded-xl shadow p-16"
                 onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="flex gap-x-16">
                    <div>
                        <img src={img} alt={name} className="rounded object-cover w-[460px] h-[260px]"/>
                        <div className="mt-4 flex justify-between">
                            <img src={img} alt={name} className="size-[60px] rounded"/>
                            <img src={img} alt={name} className="size-[60px] rounded"/>
                            <img src={img} alt={name} className="size-[60px] rounded"/>
                            <img src={img} alt={name} className="size-[60px] rounded"/>
                            <img src={img} alt={name} className="size-[60px] rounded"/>
                            <img src={img} alt={name} className="size-[60px] rounded"/>
                        </div>
                    </div>
                    <div className="max-w-[270px]">
                        <div><span className="font-bold text-2xl">{name}</span></div>
                        <div className="pt-2 pb-4"><span className="text-sm text-white/[.2]">{category}</span></div>
                        <p>{content}</p>
                        <div className="mt-16 mb-6"><span className="font-bold text-2xl">{price}₽</span></div>
                        <Button type={ButtonTypes.OUTLINED}>Добавить в корзину</Button>
                    </div>
                </div>

                <button className="absolute top-6 right-6" onClick={closeModal}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
                            fill="white"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CardModal;