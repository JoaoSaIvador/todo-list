const { gql } = require("apollo-server");

module.exports = gql`
    type Task {
        id: ID
        text: String
        done: Boolean
		user: String
        createdAt: String
    }

	type User {
		username: String
		email: String
		password: String
		token: String
	}

    type Query {
        getTasks(user: String!): [Task]
		getUser(id: ID!): User
		verifyUser(token: String!): User
    }

    input TaskInput {
        text: String
        done: Boolean
		user: String
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
		toggleTask(ID: ID, user: String): Boolean
        removeTask(ID: ID, user: String): Boolean
		registerUser(registerInput: RegisterInput): User
		loginUser(loginInput: LoginInput): User
    }
`;