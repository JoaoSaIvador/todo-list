const Task = require('../../models/Task');

module.exports = {
	Query: {
		async getTasks(_, { user }) {
			return await Task.find({ user: user }).sort({ createdAt: -1 });
		}
	},
	Mutation: {
		async createTask(_, args) {
			const task = args.task;

			const createdTask = new Task({
				text: task.text,
				done: task.done,
				user: task.user,
				createdAt: new Date().toISOString()
			})

			const res = await createdTask.save(); // MongoDB saving

			return {
				id: res.id,
				text: res.text,
				done: res.done,
				user: task.user,
				createdAt: res.createdAt
			};
		},
		async toggleTask(_, { ID, user }) {
			const task = await Task.findOne({ _id: ID, user: user });
			const done = !task.done;

			const updated = await Task.updateOne({ _id: ID, user: user }, { done: done });
			return updated;
		},
		async removeTask(_, { ID, user }) {
			const deleted = (await Task.deleteOne({ _id: ID, user: user })).deletedCount;
			return deleted;
		}
	}
};