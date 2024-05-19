import {createSelector, createSlice} from "@reduxjs/toolkit";
import {InitialReducerState, LoadingStatus} from "../../types/types";
import {IProduct} from "../../types/models";
import {RootState} from "../store";

const initialState : InitialReducerState<IProduct> = {
    status: LoadingStatus.IDLE,
    entities: [
        {id: 0, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/5.jpg"), category: "tshirt", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
        {id: 1, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/2.jpg"), category: "tshirt", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
        {id: 2, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/6.jpg"), category: "technic", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
        {id: 3, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/8.jpg"), category: "tshirt", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
        {id: 4, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/4.jpg"), category: "cup", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
        {id: 5, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/1.jpg"), category: "tshirt", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
        {id: 6, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/7.jpg"), category: "sticker", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
        {id: 7, price: 3000, name: "Lorem Ipsum", img: require("../../assets/products/3.jpg"), category: "sticker", content: "Lorem ipsum dolor sit amet consectetur. Quis ultricies a venenatis convallis Quis ultricies a venenatis convallis"},
    ]
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {}
})

export const selectAllProducts = (state: RootState) => state.products.entities

export const selectProductByIds = createSelector(
    [(state: RootState, _) => state.products.entities, (_, ids: number[]) => ids],
    (products, ids) => {
        return ids.map(id => products.find(product => product.id === id)).filter(item => item)
    }
)

export const { reducer: productsReducer, actions: productsActions } = productsSlice;