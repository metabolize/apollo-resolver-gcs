'use strict'

const { loadFixtures } = require('../src/gcs-test-helpers')
const fixtures = require('../src/test-fixtures')
const { projectId, bucketName, location } = require('./server-config')

;(async () => {
  await loadFixtures({
    projectId,
    bucketName,
    location,
    fixtures,
    argsToKey: ({ slug }) => `${slug}.json`,
  })
})()
