import { gql } from 'apollo-server-express'

export const typeDefs = gql`
	type Query {
		hello: String!
		cats: [Cat!]!
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
	}

	type Mutation {
		createCat(name: String!): Cat!
		updateCat(id: ID!, name: String!): Cat!
		deleteCat(id: ID!): Cat!
	}
`
