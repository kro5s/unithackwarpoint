import {createSelector, createSlice} from "@reduxjs/toolkit";
import {InitialReducerState, LoadingStatus} from "../../types/types";
import {ICartItem} from "../../types/models";
import {RootState} from "../store";

const initialState : InitialReducerState<ICartItem> = {
    status: LoadingStatus.IDLE,
    entities: [
        {id: 0, cartId: 0, productId: 0, quantity: 2},
        {id: 1, cartId: 0, productId: 1, quantity: 1},
        {id: 2, cartId: 0, productId: 2, quantity: 2},
        {id: 3, cartId: 0, productId: 3, quantity: 3}
    ]
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addNewItem(state, action) {
            let item = state.entities.find(item => item.id === action.payload.id)

            if (item) item.quantity++;
            else state.entities.push(action.payload)
        },
        deleteItem(state, action) {
            state.entities = state.entities.filter(item => item.id !== action.payload)
        },
        changeQuantity(state, action) {
            let item = state.entities.find(item => item.id === action.payload.id)

            if (item) item.quantity = action.payload.quantity
        }
    }
})

export const selectAllCartItems = (state: RootState) => state.cart.entities

export const selectCartItemByProductId = createSelector(
    [(state: RootState, _) => state.cart.entities, (_, id: number) => id],
    (cartItems, id) => cartItems.find(cartItem => cartItem.productId === id)
)

export const { reducer: cartReducer, actions: cartActions } = cartSlice