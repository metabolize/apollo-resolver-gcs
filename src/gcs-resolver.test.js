'use strict'

const { UserInputError } = require('apollo-server')
const { createResolver } = require('./gcs-resolver')
const { projectId, bucketName, location } = require('./test-config')
const { loadFixtures } = require('./gcs-test-helpers')
const fixtures = require('./test-fixtures')

const argsToKey = ({ slug }) => `${slug}.json`

beforeAll(async () => {
  await loadFixtures({ projectId, bucketName, location, fixtures, argsToKey })
})

const resolver = createResolver({
  projectId,
  bucketName,
  argsToKey,
})

describe('When an item exists', () => {
  test('The resolver can fetch it from GCS', async () => {
    const [item] = fixtures
    const { slug } = item

    expect.assertions(1)
    const data = await resolver(undefined, { slug }, undefined, undefined)
    expect(data).toEqual(item)
  })
})

describe('When an item does not exist', () => {
  test(
    'The expected error is returned',
    async () => {
      expect.assertions(1)
      await expect(
        resolver(
          undefined,
          { slug: 'this-one-does-not-exist' },
          undefined,
          undefined
        )
      ).rejects.toThrow(UserInputError)
    },
    10000
  )
})
