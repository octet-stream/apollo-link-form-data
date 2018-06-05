const {ApolloLink} = require("apollo-link")

const requestHandler = require("./requestHandler")

/**
 * @public
 */
class ApolloLinkFormData extends ApolloLink {
  constructor(options = {}) {
    super(requestHandler(options).request)
  }
}

const createFormDataLink = options => new ApolloLinkFormData(options)

module.exports = ApolloLinkFormData
module.exports.default = ApolloLinkFormData
module.exports.createFormDataLink = createFormDataLink
