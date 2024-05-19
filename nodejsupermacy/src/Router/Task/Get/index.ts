import Router from "../../../Types/Router";
import Route from "../../../Types/Route";
import {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";
import Token from "../../../Service/Token";

const defaultRoute = new Route(
	"/",
	"get",
	async (req, res) => {
		try {
			let [type, token] = (req.headers.authorization || "").split(" ")
			if (type != "Bearer" || !token)
				return res.status(401).json({error: {message: "Provide auth with 'Authorization: Bearer <token>'."}})
			Token.validate(token)
		//	let tasks =
		} catch (e) {
			console.error(e)
			if (e instanceof JsonWebTokenError) {
				return res.status(401).json({error: {message: "Invalid token."}})
			}
			if (e instanceof TokenExpiredError) {
				return res.status(401).json({error: {message: "Token expired."}})
			}
			res.status(500).json({error: {message: "Internal Server Error."}})
		}
	}
)
export default new Router(
	"/",
	[
		defaultRoute
	]
)