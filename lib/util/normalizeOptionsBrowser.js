const serialize = require("@octetstream/object-to-form-data")

const hasFiles = require("./hasFiles")

const assign = Object.assign

/**
 * @private
 */
function normalizeOptions(options) {
  if (hasFiles(options.body.variables)) {
    options.body = serialize(options.body)

    options.headers = assign({}, options.headers, {accept: "*/*"})
  } else {
    options.body = JSON.stringify(options.body)

    options.headers = assign({}, options.headers, {
      "content-type": "application/json"
    })
  }

  return options
}

module.exports = normalizeOptions
