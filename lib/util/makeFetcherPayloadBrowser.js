const serialize = require("@octetstream/object-to-form-data")

const hasFiles = require("./hasFiles")

const assign = Object.assign

/**
 * @api private
 */
function makeFetcherPayload({mode, ...params}) {
  if (hasFiles(params.body.variables) || (mode.force || mode.strict)) {
    params.body = serialize(params.body, mode.strict)

    params.headers = assign({}, params.headers, {accept: "*/*"})
  } else {
    params.body = JSON.stringify(params.body)

    params.headers = assign({}, params.headers, {
      "content-type": "application/json"
    })
  }

  return params
}

module.exports = makeFetcherPayload
