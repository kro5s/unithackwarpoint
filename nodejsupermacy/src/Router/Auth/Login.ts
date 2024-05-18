import Route from "../../Types/Route";
import {createHash} from "node:crypto";
import Token from "../../Service/Token";
import User from "../../Service/User";
import {UserNotFoundError} from "../../Types/Errors";

export default new Route(
	"/login",
	"post",
	async (req, res) => {
		try {
			const {email, phone, password} = req.body
			if ((!email && !phone) || (typeof email != "string" && typeof phone != "string")) {
				return res.status(400).json({error: {message: "Provide valid email or phone field."}})
			}
			if (!password || typeof password != "string") {
				return res.status(400).json({error: {message: "Provide valid password field."}})
			}
			const hashedPassword = createHash("sha256").update(password).digest("hex")
			const user = await User.get({email, phone})
			if (user.password != hashedPassword)
				return res.status(401).json({error: {message: "Incorrect password"}})
			const [access, refresh] = Token.issue({
				id: user.id,
				email: user.email,
				phone: user.phone,
				name: user.name
			})
			res.status(200).json({message: "ok", auth: {access, refresh}})
		} catch (e) {
			console.error(e)
			if (e instanceof UserNotFoundError) {
				return res.status(404).json({error: {message: e.message}})
			}
			res.status(500).json({error: {message: "Internal Server Error"}})
		}
	}
)