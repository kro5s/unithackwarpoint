import { PrismaClient } from "@prisma/client";
import express, { Application } from "express";
import router from "./Router";

export default class App {
	public readonly api: Application
	public readonly prisma: PrismaClient
	private static _this: App | null = null

	public start(port: number) {
		this.prisma.$connect()
		this.api.listen(port, () => {
			console.log(`App listening on ${port}`)
		})
	}

	public static get(): App {
		if (App._this == null) throw new Error("Singletone is not created!")
		return App._this
	}

	constructor() {
		if (App._this != null) throw new Error("Singletone must be single!")
		App._this = this
		this.api = express()
		this.prisma = new PrismaClient()
		this.api.use(express.json())
		this.api.use("/", router.router)
	}
}
