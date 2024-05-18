import jwt, {JwtPayload} from "jsonwebtoken"
import fs from "fs"
import {User} from "@prisma/client"

const privateKey = fs.readFileSync(process.cwd() + process.env.PRIVATE_KEY)
const publicKey = fs.readFileSync(process.cwd() + process.env.PUBLIC_KEY)

function issue(user: User): [string, string] {
	return [
		jwt.sign({type: "user_access", user}, privateKey, {algorithm: 'RS256', expiresIn: "15h"}),
		jwt.sign({type: "user_refresh", user}, privateKey, {algorithm: 'RS256', expiresIn: "15d"})
	]
}

function validate(token: string) {
	let data = jwt.verify(token, publicKey, {algorithms: ['RS256']}) as JwtPayload
	return {...data}
}

export default {
	issue, validate
}
