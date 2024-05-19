import Router from "../../Types/Router";
import Get from "./Get";
import Submit from "./Submit";

export default new Router(
	"/task",
	[Get, Submit]
)