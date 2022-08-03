const User = require('../../models/User');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
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
		}
	}
};