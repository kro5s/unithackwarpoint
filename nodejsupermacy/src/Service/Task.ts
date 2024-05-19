import App from "../App";

const selectQuery = {
	id: true,
	name: true,
	starts: true,
	outdates: true,
	case: {
		select: {
			id: true,
			name: true,
			image: true
		}
	}
};

function getAllTasks() {
	const app = App.get()
	return app.prisma.task.findMany({
		where: {
			starts: {
				lte: new Date()
			},
			outdates: {
				gte: new Date()
			}
		},
		select: selectQuery
	});
}

function getTaskById(id: number) {
	const app = App.get()
	return app.prisma.task.findUnique({
		where: {id},
		select: selectQuery
	});
}
export default {getAllTasks, getTaskById}

