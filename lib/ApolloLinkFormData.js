const {ApolloLink} = require("apollo-link")

const requestHandler = require("./requestHandler")

/**
 * @public
 */
class HttpLink extends ApolloLink {
  constructor(options = {}) {
    super(requestHandler(options).request)
  }
}

export default HttpLink
