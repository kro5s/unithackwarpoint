import React, {useState} from 'react';
import {IProduct} from "../../types/models";
import CardModal from "./CardModal";

const Card: React.FC<IProduct> = ({id, name, img, category, price, content}) => {
    const [modalOpened, setModalOpened] = useState(false)

    return (
        <>
            <article className="p-6 rounded bg-dark-secondary relative z-10 shadow cursor-pointer"
                     onClick={() => setModalOpened(true)}>
                <img src={img} alt="" className="object-cover aspect-video rounded"/>
                <div className="pt-6 pb-4"><span className="font-bold text-xl">{name}</span></div>
                <p className="line-clamp-3 text-sm">{content}</p>
                <div className="pt-12 flex items-center justify-between">
                    <span className="font-bold text-2xl">{price}₽</span>
                    <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.95536 25C5.36152 25 4.83367 24.8191 4.37179 24.4572C3.90992 24.0954 3.59101 23.6294 3.41506 23.0592L0.0499862 10.8882C-0.0599835 10.4715 0.0114968 10.0877 0.264427 9.73684C0.517357 9.38597 0.863762 9.21053 1.30364 9.21053H7.57191L13.3783 0.592105C13.4883 0.416667 13.6422 0.274123 13.8402 0.164474C14.0381 0.0548246 14.2471 0 14.467 0C14.6869 0 14.8959 0.0548246 15.0938 0.164474C15.2918 0.274123 15.4457 0.416667 15.5557 0.592105L21.3621 9.21053H27.6964C28.1362 9.21053 28.4826 9.38597 28.7356 9.73684C28.9885 10.0877 29.06 10.4715 28.95 10.8882L25.5849 23.0592C25.409 23.6294 25.0901 24.0954 24.6282 24.4572C24.1663 24.8191 23.6385 25 23.0446 25H5.95536ZM5.92237 22.3684H23.0776L25.9808 11.8421H3.01917L5.92237 22.3684ZM14.5 19.7368C15.2258 19.7368 15.8471 19.4792 16.364 18.9638C16.8808 18.4485 17.1393 17.8289 17.1393 17.1053C17.1393 16.3816 16.8808 15.7621 16.364 15.2467C15.8471 14.7314 15.2258 14.4737 14.5 14.4737C13.7742 14.4737 13.1529 14.7314 12.636 15.2467C12.1192 15.7621 11.8607 16.3816 11.8607 17.1053C11.8607 17.8289 12.1192 18.4485 12.636 18.9638C13.1529 19.4792 13.7742 19.7368 14.5 19.7368ZM10.772 9.21053H18.195L14.467 3.68421L10.772 9.21053Z"
                            fill="white"/>
                    </svg>
                </div>
            </article>
            {
                modalOpened &&
                <CardModal opened={modalOpened} closeModal={() => setModalOpened(false)}
                           id={id} category={category}
                           price={price} img={img} name={name} content={content}/>
            }
        </>
    );
};

export default Card;