const serialize = require("@octetstream/object-to-form-data")

const hasFiles = require("./hasFiles")

const assign = Object.assign

/**
 * @private
 */
function normalizeOptions(options) {
  if (hasFiles(options.body.variables)) {
    const {stream, boundary} = serialize(options.body)

    options.body = stream

    options.headers = assign({}, options.headers, {
      accept: "*/*",
      "content-type": `multipart/form-data; boundary=${boundary}`
    })
  } else {
    options.body = JSON.stringify(options.body)

    options.headers = assign({}, options.headers, {
      "content-type": "application/json"
    })
  }

  return options
}

module.exports = normalizeOptions
