'use strict'

const { loadFixtures } = require('../src/test-fixtures/load-fixtures')
const fixtures = require('../src/test-fixtures/fixtures')
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
