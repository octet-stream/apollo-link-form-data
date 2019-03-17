const isArray = Array.isArray

/**
 * Creates a new array with all sub-array elements concatted into it recursively
 *
 * @return {array}
 *
 * @api private
 */
function arrayFlat(array) {
  const walk = (prev, next) => (
    isArray(next) ? arrayFlat(next) : prev.concat([next])
  )

  return array.reduce(walk, [])
}

module.exports = arrayFlat
