const { model, Schema } = require('mongoose');

const taskSchema = new Schema({
	text: String,
	done: Boolean,
	user: String,
	createdAt: String
});

module.exports = model('Task', taskSchema);