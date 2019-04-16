import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'

import { resolvers } from './schema/resolvers'
import { typeDefs } from './schema/typeDefs'

const startServer = async () => {
	const app = express()

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: request => ({
			...request
		})
	})

	server.applyMiddleware({ app, path: '/' })

	await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true
	})

	app.listen({ port: 4000 }, () =>
		console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
	)
}

startServer()
