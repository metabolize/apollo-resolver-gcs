'use strict'

const { expect } = require('chai')
const { UserInputError } = require('apollo-server')
const fixtures = require('./test-fixtures/fixtures')
const { argsToKey } = require('./test-fixtures/defs')
const { createResolver } = require('./gcs-resolver')
const { projectId, bucketName } = require('./test-config')

// Ensure the fixture-loading hooks are registered first.
require('./test-fixtures/load-fixture-hooks.test')

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

    await expect(
      resolver(
        undefined,
        { slug: 'this-one-does-not-exist' },
        undefined,
        undefined
      )
    ).to.be.rejectedWith(UserInputError)
  })
})
