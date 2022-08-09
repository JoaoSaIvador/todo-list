const taskResolvers = require('./tasks');
const userResolvers = require('./users');

module.exports = {
	Query: {
		...taskResolvers.Query,
		...userResolvers.Query,
	},
	Mutation: {
		...taskResolvers.Mutation,
		...userResolvers.Mutation,
	}
}
