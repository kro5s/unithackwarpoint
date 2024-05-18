import Router from "../Types/Router";
import Auth from "./Auth";
import Token from "./Token";

export default new Router(
	"/",
	[
		Auth, Token
	]
)