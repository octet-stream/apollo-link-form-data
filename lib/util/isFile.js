const {Readable} = require("stream")

const isBuffer = Buffer.isBuffer

/**
 * Check if the given value is a "file-like" object in Node.js
 *
 * @param {any} value
 *
 * @return {boolean} – returns "true" when given value is a file-like object or
 *   "false" for otherwise
 *
 * @api private
 */
const isFile = value => value instanceof Readable || isBuffer(value)

module.exports = isFile
