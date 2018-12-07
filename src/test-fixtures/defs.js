'use strict'

const { gql } = require('apollo-server')

const typeDefs = gql`
  type Book {
    slug: String
    title: String
    author: String
  }

  type Query {
    getBook(slug: String!): Book
  }
`

const argsToKey = ({ slug }) => `${slug}.json`

module.exports = {
  typeDefs,
  argsToKey,
}
