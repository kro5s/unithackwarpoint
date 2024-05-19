import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface IInitialState {
	value: {
		accessToken: string
		refreshToken: string
	}
}

const initialState: IInitialState = {
	value: {
		accessToken: window.localStorage.getItem("access_token") || "",
		refreshToken:
			window.localStorage.getItem("refresh_token") || ""
	}
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setTokenPair(state, action: PayloadAction<{ access: string, refresh: string }>) {
			state.value.accessToken = action.payload.access
			state.value.refreshToken = action.payload.refresh
		}
	}
})

export const selectTokenPair = (state: RootState) => ({
	accessToken: state.auth.value.accessToken,
	refreshToken: state.auth.value.refreshToken
})

export const {reducer: authReducer, actions: authActions} = authSlice