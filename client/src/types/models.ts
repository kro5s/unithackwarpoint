export interface IProduct {
    id: number,
    name: string;
    price: number;
    img: string;
    category: string;
    content: string;
}

export interface ICartItem {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
}