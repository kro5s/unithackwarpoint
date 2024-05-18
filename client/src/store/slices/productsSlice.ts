import {createSlice} from "@reduxjs/toolkit";
import {LoadingStatus} from "../../types/types";
import {IProduct} from "../../types/models";
import {RootState} from "../store";

interface IInitialState {
    status: LoadingStatus,
    entities: IProduct[]
}

const initialState : IInitialState = {
    status: LoadingStatus.IDLE,
    entities: [
        {id: 0, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/5.jpg"), category: "shirt", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
        {id: 1, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/2.jpg"), category: "shirt", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
        {id: 2, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/6.jpg"), category: "shirt", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
        {id: 3, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/8.jpg"), category: "shirt", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
        {id: 4, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/4.jpg"), category: "shirt", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
        {id: 5, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/1.jpg"), category: "shirt", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
        {id: 6, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/7.jpg"), category: "shirt", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
        {id: 7, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/3.jpg"), category: "shirt", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
    ]
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {}
})

export const selectAllProducts = (state: RootState) => state.products.entities

export const { reducer: productsReducer, actions: productsActions } = productsSlice;