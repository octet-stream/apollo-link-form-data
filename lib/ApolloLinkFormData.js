const {ApolloLink} = require("apollo-link")

const requestHandler = require("./requestHandler")

/**
 * @api public
 */
class ApolloLinkFormData extends ApolloLink {
  constructor(options = {}) {
    super(requestHandler(options).request)
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
