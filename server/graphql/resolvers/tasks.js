const Task = require('../../models/Task');

module.exports = {
	Query: {
		async getTasks() {
			return await Task.find().sort({ createdAt: -1 });
		}
	},
	Mutation: {
		async createTask(_, args) {
			const task = args.task;

			const createdTask = new Task({
				text: task.text,
				done: task.done,
				createdAt: new Date().toISOString()
			})

			const res = await createdTask.save(); // MongoDB saving

			return {
				id: res.id,
				text: res.text,
				done: res.done,
				createdAt: res.createdAt
			};
		},
		async removeTask(_, { ID }) {
			const deleted = (await Task.deleteOne({ _id: ID })).deletedCount;
			return deleted;
		}
	}
};