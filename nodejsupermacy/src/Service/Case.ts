import App from "../App";

const selectQuery = {
	id: true,
	name: true,
	image: true
};

function getAllCases() {
	const app = App.get()
	return app.prisma.case.findMany({
		select: selectQuery
	});
}

function getCaseById(id: number) {
	const app = App.get()
	return app.prisma.case.findUnique({
		where: {id},
		select: selectQuery
	});
}

function getCaseByIdToSubmit(id: number, userId: number) {
	const app = App.get()
	return app.prisma.case.findUnique({
		where: {id},
		select: {
			id: true,
			name: true,
			image: true,
			CardsInCases: {
				select: {
					card: true
				}
			},
			Task: {
				select: {
					TaskCompletion: {
						where: {
							user: {
								id: userId
							}
						},
						select: {
							user: {
								select: {
									id: true
								}
							}
						}
					}
				}
			}
		}
	})
}

export default {getAllCases, getCaseById, getCaseByIdToSubmit}

