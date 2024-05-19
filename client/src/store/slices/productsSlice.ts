import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {InitialReducerState, LoadingStatus} from "../../types/types";
import {IProduct} from "../../types/models";
import {RootState} from "../store";
import Api, {useApi} from "../../api/index";

const initialState: InitialReducerState<IProduct> = {
    status: LoadingStatus.IDLE,
    entities: []
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = LoadingStatus.LOADING
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = LoadingStatus.SUCCEEDED
                state.entities = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = LoadingStatus.FAILED
            })
})

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, 3000)
    })

    const response = await fetch("http://localhost:8000/api/shop/products")
    const json = await response.json()

    return json;
})

export const selectAllProducts = (state: RootState) => state.products.entities

export const selectProductByIds = createSelector(
    [(state: RootState, _) => state.products.entities, (_, ids: number[]) => ids],
    (products, ids) => {
        return ids.map(id => products.find(product => product.id === id))
    }
)

export const {reducer: productsReducer, actions: productsActions} = productsSlice;