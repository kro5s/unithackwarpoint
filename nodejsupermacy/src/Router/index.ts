import Router from "../Types/Router";
import Auth from "./Auth";
import Token from "./Token";
import Task from "./Task";

export default new Router(
	"/",
	[
		Auth, Token, Task
	]
)