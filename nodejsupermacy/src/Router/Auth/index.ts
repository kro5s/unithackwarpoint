import Router from "../../Types/Router";
import Register from "./Register";
import Login from "./Login";

export default new Router(
	"/auth",
	[Register, Login]
)