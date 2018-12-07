'use strict'

const { Storage } = require('@google-cloud/storage')
const { isErrorReason } = require('../gcs-errors')

const argsToKey = ({ slug }) => `${slug}.json`

async function createBucketIfNotExists({ projectId, bucketName, location }) {
  const storage = new Storage({ projectId })
  try {
    await storage.createBucket(bucketName, {
      location,
      storageClass: 'regional',
    })
  } catch (e) {
    if (!isErrorReason(e, 'conflict')) {
      throw e
    }
  }
}

async function loadFixturesIntoBucket({ projectId, bucketName, fixtures }) {
  const bucket = new Storage({ projectId }).bucket(bucketName)

  for (const item of fixtures) {
    const key = argsToKey(item)
    const json = JSON.stringify(item)
    try {
      await bucket
        .file(key, { generation: 0 })
        .save(json, { gzip: true, resumable: false })
    } catch (e) {
      if (!isErrorReason(e, 'conditionNotMet')) {
        throw e
      }
    }
  }
}

async function loadFixtures({ projectId, bucketName, location, fixtures }) {
  await createBucketIfNotExists({ projectId, bucketName, location })
  await loadFixturesIntoBucket({ projectId, bucketName, fixtures })
}

module.exports = {
  argsToKey,
  createBucketIfNotExists,
  loadFixturesIntoBucket,
  loadFixtures,
}
