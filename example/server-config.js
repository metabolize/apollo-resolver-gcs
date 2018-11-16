'use strict'

// To set these values locally, copy `example.env` to `.env`.

require('dotenv').config()

module.exports = {
  // Location is used when fixtures are loaded.
  location: process.env.GOOGLE_CLOUD_LOCATION,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  bucketName: process.env.GOOGLE_CLOUD_BUCKET_NAME,
}
