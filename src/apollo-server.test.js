'use strict'

const chai = require('chai')
const { ApolloServer } = require('apollo-server')
const { request } = require('graphql-request')
const fixtures = require('./test-fixtures/fixtures')
const { argsToKey, typeDefs } = require('./test-fixtures/defs')
const { projectId, bucketName } = require('./test-config')
const { createResolver } = require('./gcs-resolver')

const { expect } = chai
chai.use(require('chai-as-promised'))

// Ensure the fixture-loading hooks are registered first.
require('./test-fixtures/load-fixture-hooks.test')

let server
let url
before(async function() {
  const getBook = createResolver({
    projectId,
    bucketName,
    argsToKey,
  })
  const resolvers = { Query: { getBook } }
  server = new ApolloServer({ typeDefs, resolvers })
  ;({ url } = await server.listen())
})

after(async function() {
  server.stop()
  server = undefined
})

async function requestBook(slug) {
  return request(
    url,
    `
      query GetExampleBook($slug: String!) {
        getBook(slug: $slug) {
          title,
          author
        }
      }
    `,
    { slug }
  )
}

context('When an item exists', function() {
  it('The client can fetch it from the server', async function() {
    // return
    this.timeout(5000)

    const [item] = fixtures
    const { slug } = item

    const data = await requestBook(slug)

    const { title, author } = item
    const expected = { getBook: { title, author } }
    expect(data).to.deep.equal(expected)
  })
})

context('When an item does not exist', function() {
  it('The expected error is returned', async function() {
    this.timeout(10000)

    await expect(requestBook('this-one-does-not-exist')).to.be.rejectedWith(
      'Not found'
    )
  })
})
