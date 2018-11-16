'use strict'

function isErrorReason(e, reason) {
  if ('errors' in e) {
    return e.errors.length === 1 && e.errors[0].reason === reason
  } else {
    throw Error(`
      This is not an API error response. It may be an HTTP response. In that
      case you should inspect its \`code\` property.
      ${e}
    `)
  }
}

module.exports = {
  isErrorReason,
}
