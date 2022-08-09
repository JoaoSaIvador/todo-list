const User = require('../../models/User');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
	Query: {
		async getUser(_, { ID }) {
			return await User.findById(ID);
		},
		async verifyUser(_, { token }) {

			var decoded = null;
			try {
				decoded = jwt.verify(token, process.env.JWT_SECRET);
			} catch (err) {
				throw new ApolloError('Invalid token!', 'INVALID_TOKEN');
			}

			// Token valid
			const email = decoded.email;
			return await User.findOne({ email });
		}
	},
	Mutation: {
		async registerUser(_, { registerInput: { username, email, password } }) {

			// Check if old user exists with the same email
			const oldUser = await User.findOne({ email });

			if (oldUser) {
				throw new ApolloError('A user is already registered with the email: ' + email + '!', 'USER_ALREADY_EXISTS')
			}

			// Encrypt password
			var encryptedPassword = await bcrypt.hash(password, 10);

			// Build mongoose model
			const newUser = new User({
				username: username,
				email: email.toLowerCase(),
				password: encryptedPassword
			})

			// Create JWT
			const token = jwt.sign(
				{ user_id: newUser._id, email },
				process.env.JWT_SECRET,
				{
					expiresIn: "2h"
				}
			);

			newUser.token = token;

			// Save user in MongoDB
			const res = await newUser.save(); // MongoDB saving

			return {
				id: res.id,
				...res._doc
			};
		},
		async loginUser(_, { loginInput: { email, password } }) {

			// Check if user exists with the same email and if given password is correct
			const user = await User.findOne({ email });

			if (!user) {
				throw new ApolloError('User does not exist!', 'USER_DOES_NOT_EXIST');
			}

			if (!(await bcrypt.compare(password, user.password))) {
				throw new ApolloError('Incorrect password!', 'INCORRECT_PASSWORD');
			}

			// Create JWT
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.JWT_SECRET,
				{
					expiresIn: "2h"
				}
			);

			user.token = token;

			return {
				id: user.id,
				...user._doc
			};

		}
	}
};