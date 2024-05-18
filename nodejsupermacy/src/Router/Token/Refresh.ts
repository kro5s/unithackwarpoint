import Route from "../../Types/Route";
import Token from "../../Service/Token";
import {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";

export default new Route(
	"/refresh",
	"post",
	async (req, res) => {
		try {
			const {token} = req.body
			if (!token || typeof token != "string") {
				return res.status(400).json({error: {message: "Provide valid token field."}})
			}
			const data = Token.validate(token)
			const [access, refresh] = Token.issue(data.data)
			res.status(200).json({message: "ok", auth: {access, refresh}})
		} catch (e) {
			console.error(e)
			if (e instanceof JsonWebTokenError) {
				return res.status(401).json({error: {message: "Invalid token."}})
			}
			if (e instanceof TokenExpiredError) {
				return res.status(401).json({error: {message: "Token expired."}})
			}
			res.status(500).json({error: {message: "Internal Server Error"}})
		}
	}
)