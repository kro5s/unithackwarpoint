export class EmailIsUsedError extends Error {
	constructor(email: string) {
		super(`Email ${email} is used.`);
	}
}
export class PhoneIsUsedError extends Error {
	constructor(phone: string) {
		super(`Phone ${phone} is used.`);
	}
}

export class UserNotFoundError extends Error {
	constructor(data: { id?: number, phone?: string, email?: string}) {
		super(`User with query ${data} not found.`);
	}
}