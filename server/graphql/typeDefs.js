const { gql } = require("apollo-server");

module.exports = gql`
    type Task {
        id: ID
        text: String
        done: Boolean
        createdAt: String
    }

    type Query {
        getTasks: [Task]
    }

    input TaskInput {
        text: String
        done: Boolean
    }

    type Mutation {
        saveTask(task: TaskInput): Task
        removeTask(ID: ID): Boolean
    }
`;