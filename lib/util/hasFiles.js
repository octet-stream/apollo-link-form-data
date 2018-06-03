const iterator = require("./objectIterator")
const isPlainObject = require("./isPlainObject")
const isFile = require("./isFile")

const isArray = Array.isArray

/**
 * Check if given object has files
 *
 * @param {any[] | {[key: string]: any}} iterable – an array or object to check
 *  if files exists there
 *
 * @return {boolean}
 *
 * @private
 */
function hasFiles(iterable) {
  for (const value of iterator(iterable)) {
    if (isPlainObject(value) || isArray(value)) {
      if (hasFiles(value)) {
        return true
      }
    } else if (isFile(value)) {
      return true
    }
  }

  return false
}

module.exports = hasFiles
