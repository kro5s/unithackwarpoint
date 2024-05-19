import Route from "../../Types/Route";

export default new Route(
	"/submit",
	"post",
	(req, res) => {
		try {
			res.status(501).json({error:"Not Implemented."})
		} catch(e) {
			console.error(e)
			res.status(500).json({error:"Internal Server Error."})
		}
	}
)