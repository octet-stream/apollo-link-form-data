const {ApolloLink} = require("apollo-link")

const createRequestHandler = require("./createRequestHandler")

/**
 * @api public
 */
class ApolloLinkFormData extends ApolloLink {
  constructor(options = {}) {
    super(createRequestHandler(options))
  }
}

/**
 * @api public
 */
const createFormDataLink = options => new ApolloLinkFormData(options)

module.exports = ApolloLinkFormData
module.exports.default = ApolloLinkFormData
module.exports.ApolloLinkFormData = ApolloLinkFormData
module.exports.createFormDataLink = createFormDataLink
