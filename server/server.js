const { ApolloServer } = require("apollo-server");
const mongoose = require('mongoose');

require('dotenv').config();
const MONGODB = process.env.MONGODB_CONNECTION;

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/tasks');

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(MONGODB, { useNewUrlParser: true })
	.then(() => {
		console.log("Mongo DB Connection successful!");
		return server.listen({ port: 4000 });
	})
	.then((res) => {
		console.log(`Server running at ${res.url}`);
	})