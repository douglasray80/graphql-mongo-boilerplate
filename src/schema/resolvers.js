import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { Cat, User } from '../models'

export const resolvers = {
	Query: {
		hello: () => 'hi',
		cats: () => Cat.find(),
		getCat: async (_, { id }) => Cat.findById(id),
		users: () => User.find()
	},
	Mutation: {
		createCat: async (_, { name }) => {
			const cat = new Cat({ name })
			await cat.save()
			return cat
		},
		updateCat: async (_, { id, name }) => {
			const cat = await Cat.findByIdAndUpdate(id, { name })
			return cat
		},
		deleteCat: async (_, { id }) => {
			const cat = await Cat.findByIdAndDelete(id)
			return cat
		},
		signup: async (_, args) => {
			const password = await bcrypt.hash(args.password, 10)
			const newUser = new User({ ...args, password })
			const user = await newUser.save()

			return {
				token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
				user
			}
		},
		login: async (_, { email, password }) => {
			const user = await User.findOne({ email })
			if (!user) {
				throw new Error(`No such user found for email: ${email}`)
			}

			const valid = await bcrypt.compare(password, user.password)
			if (!valid) {
				throw new Error('Invalid password')
			}

			return {
				token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
				user
			}
		}
	}
}
