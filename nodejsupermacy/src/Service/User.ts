import App from "../App";
import {EmailIsUsedError, PhoneIsUsedError, UserNotFoundError} from "../Types/Errors";

async function create(email: string, phone: string, name: string, password: string) {
	const app = App.get();
	const users = await app.prisma.user.findMany({
		where: {
			OR: [
				{email}, {phone}
			]
		},
		select: {
			email: true,
			phone: true
		}
	})
	if (users.length > 0) {
		if (users[0]?.email == email || users[1]?.email == email)
			throw new EmailIsUsedError(email)
		if (users[0]?.phone == phone || users[1]?.phone == phone)
			throw new PhoneIsUsedError(phone)
	}
	return app.prisma.user.create({
		data: {
			email: email,
			password: password,
			phone: phone,
			name: name
		}
	});
}

async function get({id, email, phone}: { id?: number, email?: string, phone?: string }) {
	const app = App.get()
	if (!id && !email && !phone) throw new Error()
	let user = await app.prisma.user.findUnique({
		where: {
			id, email, phone
		}
	})
	if (!user) throw new UserNotFoundError({id, email, phone})
	return user
}

export default {
	create, get
}