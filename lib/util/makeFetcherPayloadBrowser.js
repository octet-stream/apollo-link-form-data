const serialize = require("@octetstream/object-to-form-data")

const hasFiles = require("./hasFiles")

/**
 * @api private
 */
async function makeFetcherPayload({mode, ...params}) {
  if (hasFiles(params.body.variables) || (mode.force || mode.strict)) {
    params.body = serialize(params.body, mode.strict)

    params.header = {...params.headers, accept: "*/*"}
  } else {
    params.body = JSON.stringify(params.body)

    params.headers = {...params.headers, "content-type": "application/json"}
  }

  return params
}

module.exports = makeFetcherPayload
