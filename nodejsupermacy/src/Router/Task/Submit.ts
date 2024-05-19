import Route from "../../Types/Route";
import {checkAuthOrSendError} from "../../Tools/Auth";
import Task from "../../Service/Task";
import App from "../../App";

export default new Route(
	"/submit",
	"post",
	async (req, res) => {
		try {
			const data = checkAuthOrSendError(req, res)
			if (!data) return
			const userId = data?.data?.id
			if (!userId) {
				console.error(new Error("Check token formation!"))
				res.status(500).json({error: "Internal Server Error."})
			}
			const {id} = req.body
			if (!id || typeof id != "number") {
				return res.status(400).json({error: {message: "Provide valid id field."}})
			}
			const task = await Task.getTaskById(id)
			if (!task || task.starts > new Date())
				return res.status(404).json({error: {message: `Task with id ${id} not found`}})
			const userTaskCompleteWrite = await App.get().prisma.taskCompletion.create({
				data: {
					user: {
						connect: {
							id: userId
						}
					},
					task: {
						connect: {
							id
						}
					}
				}
			})
			res.status(200).json({message:"ok"})
		} catch (e) {
			console.error(e)
			res.status(500).json({error: "Internal Server Error."})
		}
	}
)