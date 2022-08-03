const { gql } = require("apollo-server");

module.exports = gql`
    type Task {
        id: ID
        text: String
        done: Boolean
        createdAt: String
    }

	type User {
		username: String
		email: String
		password: String
		token: String
	}

    type Query {
        getTasks: [Task]
    }

    input TaskInput {
        text: String
        done: Boolean
    }

	input RegisterInput {
		username: String
		email: String
		password: String
	}

	input LoginInput {
		email: String
		password: String
	}

    type Mutation {
        createTask(task: TaskInput): Task
        removeTask(ID: ID): Boolean
		registerUser(registerInput: RegisterInput): User
    }
`;