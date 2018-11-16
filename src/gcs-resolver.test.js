'use strict'

const chai = require('chai')
const { UserInputError } = require('apollo-server')
const { createResolver } = require('./gcs-resolver')
const { projectId, bucketName, location } = require('./test-config')
const { loadFixtures } = require('./gcs-test-helpers')
const fixtures = require('./test-fixtures')

const { expect } = chai
chai.use(require('chai-as-promised'))

const argsToKey = ({ slug }) => `${slug}.json`

before(async function() {
  this.timeout(10000)
  await loadFixtures({ projectId, bucketName, location, fixtures, argsToKey })
})

const resolver = createResolver({
  projectId,
  bucketName,
  argsToKey,
})

context('When an item exists', function() {
  it('The resolver can fetch it from GCS', async function() {
    this.timeout(5000)

    const [item] = fixtures
    const { slug } = item

    expect(
      await resolver(undefined, { slug }, undefined, undefined)
    ).to.deep.equal(item)
  })
})

context('When an item does not exist', function() {
  it('The expected error is returned', async function() {
    this.timeout(10000)

    expect(
      resolver(
        undefined,
        { slug: 'this-one-does-not-exist' },
        undefined,
        undefined
      )
    ).to.be.rejectedWith(UserInputError)
  })
})
