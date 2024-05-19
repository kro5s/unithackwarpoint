import Token from "../Service/Token";
import {Request, Response} from "express";
import {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";

export function checkAuthOrSendError(req: Request, res: Response) {
	let [type, token] = (req.headers.authorization || "").split(" ")
	if (type != "Bearer" || !token) {
		res.status(401).json({error: {message: "Provide auth with 'Authorization: Bearer <token>'."}})
		return null
	}
	try {
		return Token.validate(token)
	} catch (e) {
		if (e instanceof JsonWebTokenError) {
			return res.status(401).json({error: {message: "Invalid token."}})
		}
		if (e instanceof TokenExpiredError) {
			return res.status(401).json({error: {message: "Token expired."}})
		}
	}
}