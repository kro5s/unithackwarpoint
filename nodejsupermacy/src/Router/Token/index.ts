import Router from "../../Types/Router";
import validate from "./Validate";
import refresh from "./Refresh";

export default new Router(
	"/token",
	[
		validate, refresh
	]
)