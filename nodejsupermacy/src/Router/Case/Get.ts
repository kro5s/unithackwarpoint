import Route from "../../Types/Route";
import {checkAuthOrSendError} from "../../Tools/Auth";
import Case from "../../Service/Case";

export default new Route(
	"/",
	"get",
	async (req, res) => {
		try {
			const tokenData = checkAuthOrSendError(req, res)
			if (!tokenData) return
			console.log(req.query)
			const {id} = req.query
			if (!id) {
				const cases = await Case.getAllCases()
				return res.status(200).json({message: "ok", cases})
			}
			if (typeof id != "string" || isNaN(parseInt(id))) {
				console.log(id)
				res.status(400).json({error: {message: "Provide a valid id parameter."}})
				return
			}
			let caseObject = await Case.getCaseById(parseInt(id))
			if (!caseObject)
				return res.status(404).json({error: {message: `Case with id ${id} not found`}})
			res.status(200).json({message: "ok", case: caseObject})
		} catch (e) {
			console.error(e)
			res.status(500).json({error: {message: "Internal Server Error."}})
		}
	}
)