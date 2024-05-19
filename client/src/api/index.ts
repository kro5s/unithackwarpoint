import {useDispatch, useSelector} from "react-redux";
import {authActions, selectTokenPair} from "../store/slices/authSlice";
import {AppDispatch} from "../store/store";

export default class Api {
	constructor(
		private accessToken: string,
		private refreshToken: string,
		private dispatch: AppDispatch
	) {
	}

	private async makeRequest(url: string, init?: RequestInit) {
		let reqInit: RequestInit = {
			...init,
			headers: [
				//TODO: Keep Headers (я ебал эту типизацию fetch api)
				["Authorization", `Bearer ${this.accessToken}`]
			]
		}
		let data = await fetch(url, reqInit);
		if (data.status == 401) {
			const res = await this.refreshTokens()
			if (!res) throw new Error("Token Expired.")
			data = await fetch(url, reqInit)
		}
		return data
	}

	public async getUser() {
		let data = await fetch("http://localhost:3000/api/token/validate", {
			body: JSON.stringify({token: this.accessToken})
		})
		if (data.status == 401) {
			const res = await this.refreshTokens()
			if (!res) throw new Error("Token expired")
			data = await fetch("http://localhost:3000/api/token/validate", {
				body: JSON.stringify({token: this.accessToken})
			})
		}
		return (await data.json()).data
	}

	private async refreshTokens() {
		const data = await fetch("http://localhost:3000/api/token/refresh", {
			body: JSON.stringify({token: this.refreshToken})
		})
		const body = await data.json()
		if (data.status == 200) {
			this.authenticate(body.auth.accessToken, body.auth.refreshToken)
			return true
		}
		return false
	}

	private authenticate(access: string, refresh: string) {
		this.accessToken = access
		this.refreshToken = refresh
		this.dispatch(authActions.setTokenPair({access, refresh}))
		window.localStorage.setItem("access_token", access)
		window.localStorage.setItem("refresh_token", refresh)
	}

	public async register({email, name, phone, password}: {
		email: string,
		name: string,
		phone: string,
		password: string
	}) {
		const data = await fetch("http://localhost:3000/api/auth/register", {
			body: JSON.stringify({email, name, phone, password}),
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})
		const body = await data.json()
		if (data.status == 200) {
			this.authenticate(body.auth.accessToken, body.auth.refreshToken)
		}
	}

	public async login({email, phone, password}: { email?: string, phone?: string, password: string }) {
		if (!email && !phone) throw new Error("Provide an email or a phone")
		const req = !!email ? {email, password} : {phone, password}
		const data = await fetch("http://localhost:3000/api/auth/login", {
			body: JSON.stringify(req),
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})
		const body = await data.json()
		if (data.status == 200) {
			this.authenticate(body.auth.access, body.auth.refresh)
		}
	}
}

export function useApi() {
	const tokenPair = useSelector(selectTokenPair)
	const dispatch = useDispatch()
	return new Api(tokenPair.accessToken, tokenPair.refreshToken, dispatch)
}
