const {print} = require("graphql/language/printer")
const {Observable} = require("apollo-link")

const partial = require("./util/partial")
const omit = require("./util/objectOmit")
const waterfall = require("./util/waterfall")
const makePayload = require("./util/makeFetcherPayload")

const assign = Object.assign

const defaults = {
  serialize: {
    force: false,
    strict: false
  }
}

const defaultHTTPOptions = {
  includeQuery: true,
  includeExtensions: false
}

/**
 * @api private
 */
function createRequestHandler(options = {}) {
  const mode = assign({}, defaults.serialize, options.serialize)

  options = assign({}, defaults, options)

  const fetcher = options.fetch || fetch

  const {includeExtensions} = options

  const uri = options.uri

  options = omit(options, ["uri", "fetch", "includeExtensions"])

  const request = operation => new Observable(observer => {
    const ctx = operation.getContext()
    const httpOptions = assign({}, defaultHTTPOptions, ctx.http)

    const {operationName, query, variables, extensions} = operation

    const credentials = ctx.credentials || options.credentials

    const headers = assign({}, options.headers, ctx.headers)

    const body = {operationName, variables}

    if (includeExtensions || httpOptions.includeExtensions) {
      body.extensions = extensions
    }

    if (httpOptions.includeQuery) {
      body.query = print(query)
    }

    function getResponse(resoponse) {
      operation.setContext({resoponse})

      if (resoponse.status >= 300) {
        return Promise.reject(new Error(`Network error: ${resoponse.status}`))
      }

      return resoponse.json()
    }

    function getData(payload) {
      observer.next(payload)
      observer.complete()
    }

    function onRejected(err) {
      // Do nothing when the request has been cancelled
      if (err.name === "AbortError") {
        return undefined
      }

      if (err.result && err.result.errors && err.result.data) {
        observer.next(err.result)
      }

      observer.error(err)
    }

    const sendRequest = partial(fetcher, ctx.uri ? ctx.uri : uri)
    const getPayload = partial(makePayload, {
      method: "POST", credentials, headers, body, mode
    })

    // Make a request with FormData or JSON body.
    waterfall([getPayload, sendRequest, getResponse, getData])
      .catch(onRejected)
  })

  return request
}

module.exports = createRequestHandler
