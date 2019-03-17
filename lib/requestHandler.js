const {Observable, ApolloLink} = require("apollo-link")
const {print} = require("graphql/language/printer")

const makeFetcherPayload = require("./util/makeFetcherPayload")
const waterfall = require("./util/waterfall")
const omit = require("./util/objectOmit")

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
function requestHandler(options = {}) {
  const mode = assign({}, defaults.serialize, options.serialize)

  options = assign({}, defaults, options)

  const fetcher = options.fetch || fetch

  const {includeExtensions} = options

  let uri = options.uri

  options = omit(options, ["uri", "fetch", "includeExtensions"])

  return new ApolloLink(operation => new Observable(observer => {
    const ctx = operation.getContext()
    const httpOptions = assign({}, defaultHTTPOptions, ctx.http)

    const {operationName, query, variables, extensions} = operation

    const credentials = ctx.credentials || options.credentials

    const headers = assign({}, options.headers, ctx.headers)

    const body = {operationName, variables}

    if (ctx.uri) {
      uri = ctx.uri
    }

    if (includeExtensions || httpOptions.includeExtensions) {
      body.extensions = extensions
    }

    if (httpOptions.includeQuery) {
      body.query = print(query)
    }

    function onResponsed(resoponse) {
      operation.setContext({resoponse})

      if (resoponse.status >= 300) {
        return Promise.reject(new Error(`Network error: ${resoponse.status}`))
      }

      return resoponse.json()
    }

    function onFulfilled(payload) {
      observer.next(payload)
      observer.complete()

      return payload
    }

    function onRejected(err) {
      if (err.name !== "AbortError") {
        observer.error(err)
      }
    }

    const payload = makeFetcherPayload({
      method: "POST", credentials, headers, body, mode
    })

    // Make a request with FormData or JSON body.
    waterfall([onResponsed, onFulfilled], fetcher(uri, payload))
      .catch(onRejected)
  }))
}

module.exports = requestHandler
