const { ApolloServer } = require("apollo-server");
const mongoose = require('mongoose');

const MONGODB = "mongodb+srv://joaosalvador:bYE80U5aSRyO67PK@cluster0.zpxvahx.mongodb.net/?retryWrites=true&w=majority";

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log("Mongo DB Connection successful!");
        return server.listen({port: 4000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })