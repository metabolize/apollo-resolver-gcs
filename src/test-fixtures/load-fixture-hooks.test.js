'use strict'

const { projectId, bucketName, location } = require('../test-config')
const { loadFixtures } = require('./load-fixtures')
const fixtures = require('./fixtures')

before(async function () {
  this.timeout(10000)
  await loadFixtures({ projectId, bucketName, location, fixtures })
})
