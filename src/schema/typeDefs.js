import { gql } from 'apollo-server-express'

export const typeDefs = gql`
	type Query {
		hello: String!
		cats: [Cat!]!
		users: [User!]!
	}

	type Cat {
		id: ID!
		name: String!
	}

	type User {
		id: ID!
		email: String!
		name: String!
		password: String!
		username: String!
		createdAt: DateTime
	}

	scalar DateTime

	type AuthPayload {
		token: String!
		user: User!
	}

	type Mutation {
		createCat(name: String!): Cat!
		updateCat(id: ID!, name: String!): Cat!
		deleteCat(id: ID!): Cat!
		signup(
			username: String!
			email: String!
			name: String!
			password: String!
		): AuthPayload!
		login(email: String!, password: String!): AuthPayload!
	}
`
