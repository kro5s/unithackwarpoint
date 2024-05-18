import { RouteType } from ".";
import { Request, Response } from "express";

export default class Route {
	constructor(
		public readonly route: string,
		public readonly type: RouteType,
		public readonly handler: (req: Request, res: Response) => any
	) {
		if (!route.startsWith("/"))
			throw new Error(`Route must start with '/' but got '${route}'`)
	}
}
