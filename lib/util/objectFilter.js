const iterator = require("./objectIterator")

/**
 * @api private
 */
function objectFilter(object, cb, ctx = null) {
  const res = {}

  for (const [key, value] of iterator(object).entries()) {
    if (cb.call(ctx, value, key, object)) {
      res[key] = value
    }
  }

  return res
}

module.exports = objectFilter
