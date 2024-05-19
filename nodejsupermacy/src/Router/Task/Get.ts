import Router from "../../Types/Router";
import Route from "../../Types/Route";
import {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";
import Token from "../../Service/Token";
import {checkAuthOrSendError} from "../../Tools/Auth";
import App from "../../App";

export default new Route(
	"/",
	"get",
	async (req, res) => {
		const selectQuery = {
			id: true,
			name: true,
			starts: true,
			outdates: true,
			case: {
				select: {
					id: true,
					name: true,
					image: true
				}
			}
		};
		try {
			const tokenData = checkAuthOrSendError(req, res)
			if (!tokenData) return
			console.log(req.query)
			const {id} = req.query
			const app = App.get()
			if (!id) {
				const tasks = await app.prisma.task.findMany({
					where: {
						starts: {
							lte: new Date()
						},
						outdates: {
							gte: new Date()
						}
					},
					select: selectQuery
				})
				return res.status(200).json({message: "ok", tasks})
			}
			if (typeof id != "string" || isNaN(parseInt(id))) {
				res.status(400).json({error: {message: "Provide a valid id parameter."}})
				return
			}
			let task = await app.prisma.task.findUnique({
				where: {id: parseInt(id)},
				select: selectQuery
			})
			if (!task || task.starts > new Date())
				return res.status(404).json({error: {message: `Task with id ${id} not found`}})
			res.status(200).json({message: "ok", task})
		} catch (e) {
			console.error(e)
			res.status(500).json({error: {message: "Internal Server Error."}})
		}
	}
)