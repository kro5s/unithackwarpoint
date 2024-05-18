import jwt, {JwtPayload} from "jsonwebtoken"
import fs from "fs"
import {User} from "@prisma/client"

const privateKey = fs.readFileSync(process.cwd() + process.env.PRIVATE_KEY)
const publicKey = fs.readFileSync(process.cwd() + process.env.PUBLIC_KEY)

function issue(data: TokenIssuePayload): [string, string] {
	return [
		jwt.sign({type: "access", data}, privateKey, {algorithm: 'RS256', expiresIn: "24h"}),
		jwt.sign({type: "refresh", data}, privateKey, {algorithm: 'RS256', expiresIn: "30d"})
	]
}

function validate(token: string) {
	let data = jwt.verify(token, publicKey, {algorithms: ['RS256']}) as JwtPayload
	return {...data}
}

export type TokenIssuePayload = {
	id: number
	email: string,
	phone: string,
	name: string
}

export default {
	issue, validate
}
