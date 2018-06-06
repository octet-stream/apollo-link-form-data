const serialize = require("@octetstream/object-to-form-data")

const hasFiles = require("./hasFiles")

const assign = Object.assign

/**
 * @private
 */
function makeFetcherPayload({mode, ...params}) {
  if (hasFiles(params.body.variables) || (mode.force || mode.strict)) {
    const {stream, boundary} = serialize(params.body, mode.strict)

    params.body = stream

    params.headers = assign({}, params.headers, {
      accept: "*/*",
      "content-type": `multipart/form-data; boundary=${boundary}`
    })
  } else {
    params.body = JSON.stringify(params.body)

    params.headers = assign({}, params.headers, {
      "content-type": "application/json"
    })
  }

  return params
}

module.exports = makeFetcherPayload
