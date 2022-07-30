const { ApolloServer } = require("apollo-server");

const typeDefs = `
    type Task {
        id: ID
        text: String
        done: Boolean
    }

    type Query {
        tasks: [Task]
    }

    input TaskInput {
        text: String
        done: Boolean
    }

    type Mutation {
        saveTask(task: TaskInput): Task
    }
`;

const tasks = [
    { id: 1, text: "Workout", done: false},
    { id: 2, text: "Clean the room", done: false},
    { id: 3, text: "Study", done: false}
];

const resolvers = {
    Query: {
        tasks() {
            return tasks;
        }
    },
    Mutation: {
        saveTask(_, args) {
            const task = args.task;
            task.id = 2342342;
            tasks.unshift(task);
            return task;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen();