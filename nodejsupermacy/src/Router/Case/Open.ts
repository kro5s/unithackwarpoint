import Route from "../../Types/Route";
import {checkAuthOrSendError} from "../../Tools/Auth";
import Task from "../../Service/Task";
import App from "../../App";
import Case from "../../Service/Case";
import {Request, Response} from "express";
import user from "../../Service/User";

export default new Route(
	"/open",
	"post",
	async (req: Request, res: Response) => {
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
			const caseObject = await Case.getCaseById(id)
			if (!caseObject)
				return res.status(404).json({error: {message: `Case with id ${id} not found`}})
			let casesToSubmit = await Case.getCaseByIdToSubmit(id, userId)
			if (!casesToSubmit) {
				return res.status(403).json({error: {message: "You can't open this case."}})
			}
			const filter = casesToSubmit.Task.map(e => e.TaskCompletion).flat().map(e => e.user.id).filter(i => i == userId)
			//TODO: filtration
			const cards = casesToSubmit.CardsInCases
			const card = cards[Math.floor(Math.random() * cards.length)]
			res.status(200).json({message: "ok", card})
		} catch (e) {
			console.error(e)
			res.status(500).json({error: "Internal Server Error."})
		}
	}
)