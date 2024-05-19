import Route from "../../Types/Route";
import {checkAuthOrSendError} from "../../Tools/Auth";
import App from "../../App";
import Task from "../../Service/Task";

export default new Route(
	"/",
	"get",
	async (req, res) => {
		try {
			const tokenData = checkAuthOrSendError(req, res)
			if (!tokenData) return
			console.log(req.query)
			const {id} = req.query
			const app = App.get()
			if (!id) {
				const tasks = await Task.getAllTasks()
				return res.status(200).json({message: "ok", tasks})
			}
			if (typeof id != "string" || isNaN(parseInt(id))) {
				console.log(id)
				res.status(400).json({error: {message: "Provide a valid id parameter."}})
				return
			}
			let task = await Task.getTaskById(parseInt(id))
			if (!task || task.starts > new Date())
				return res.status(404).json({error: {message: `Task with id ${id} not found`}})
			res.status(200).json({message: "ok", task})
		} catch (e) {
			console.error(e)
			res.status(500).json({error: {message: "Internal Server Error."}})
		}
	}
)