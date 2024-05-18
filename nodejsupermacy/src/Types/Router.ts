import Route from "./Route";
import express from "express";
export default class Router {
	public readonly router: express.Router
	constructor(
		public readonly route: string,
		public readonly children: (Router | Route)[]
	) {
		this.router = express.Router()
		if (!route.startsWith("/")) 
			throw new Error(`Route must start with '/' but got '${route}'`)
		children.map((child) => {
			if (child instanceof Router) 
				this.router.use(child.route, child.router)
			else {
				this.router[child.type](child.route, child.handler)
			}
		})
	}
}
