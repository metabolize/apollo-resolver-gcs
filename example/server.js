'use strict'

const { ApolloServer, gql } = require('apollo-server')
const { createResolver } = require('..')
const { projectId, bucketName } = require('./server-config')

const typeDefs = gql`
  type Book {
    slug: String!
    title: String!
    author: String!
  }

  type Query {
    getBook(slug: String!): Book
  }
`

const getBook = createResolver({
  projectId,
  bucketName,
  argsToKey: ({ slug }) => `${slug}.json`,
})

const resolvers = {
  Query: {
    getBook,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

;(async () => {
  const { url } = await server.listen()
  console.log(`🚀  Server ready at ${url}`)
})()
