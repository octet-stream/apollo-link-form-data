const serialize = require("@octetstream/object-to-form-data")

const hasFiles = require("./hasFiles")

const assign = Object.assign

/**
 * Produces payload to use with window.fetch request.
 *
 * @param {object} params
 *
 * @return {object}
 *
 * @api private
 */
async function makeFetcherPayload({mode, ...params}) {
  if (hasFiles(params.body.variables) || (mode.force || mode.strict)) {
    const fd = serialize(params.body, mode.strict)

    params.body = fd.stream

    params.headers = assign({}, params.headers, {
      accept: "*/*",
      "content-type": `multipart/form-data; boundary=${fd.boundary}`,
      "content-length": await fd.getComputedLength()
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
