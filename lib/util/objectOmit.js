const filter = require("./objectFilter")
const flat = require("./arrayFlat")

/**
 * @api private
 */
function objectOmit(object, ...keys) {
  keys = flat(keys)

  return filter(object, (_, key) => keys.includes(key) === false)
}

module.exports = objectOmit
