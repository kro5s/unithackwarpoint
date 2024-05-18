import Route from "../../Types/Route";
import {createHash} from "node:crypto";
import App from "../../App";
import Token from "../../Service/Token";
import User from "../../Service/User";
import {EmailIsUsedError, PhoneIsUsedError} from "../../Types/Errors";

export default new Route(
	"/register",
	"post",
	async (req, res) => {
		try {
			const {email, name, phone, password} = req.body
			if (!email || typeof email != "string") {
				return res.status(400).json({error: {message: "Provide valid email field."}})
			}
			if (!name || typeof name != "string") {
				return res.status(400).json({error: {message: "Provide valid name field."}})
			}
			if (!phone || typeof phone != "string") {
				return res.status(400).json({error: {message: "Provide valid phone field."}})
			}
			if (!password || typeof password != "string") {
				return res.status(400).json({error: {message: "Provide valid password field."}})
			}
			const hashedPassword = createHash("sha256").update(password).digest("hex")
			const user = await User.create(email, name, phone, hashedPassword)
			const [access, refresh] = Token.issue(user)
			res.status(200).json({message: "ok", auth: {access, refresh}})
		} catch (e) {
			console.error(e)
			if (e instanceof EmailIsUsedError || e instanceof PhoneIsUsedError) {
				return res.status(409).json({error: {message: e.message}})
			}
			res.status(500).json({error: {message: "Internal Server Error"}})
		}
	}
)