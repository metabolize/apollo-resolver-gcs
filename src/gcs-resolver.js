'use strict'

const { Storage } = require('@google-cloud/storage')
const { UserInputError } = require('apollo-server')

// key: args => key
// transform: async (contents, metadata) => result
function createResolver({
  projectId,
  bucketName,
  argsToKey,
  transform = contents => JSON.parse(contents),
}) {
  const bucket = new Storage({ projectId }).bucket(bucketName)

  return async function resolver(parent, args, context, info) {
    const key = argsToKey(args)
    let contents
    try {
      contents = await bucket.file(key).download()
    } catch (e) {
      if (e.code === 404) {
        throw new UserInputError('Not found')
      } else {
        throw e
      }
    }
    const result = await transform(contents)
    return result
  }
}

module.exports = { createResolver }
