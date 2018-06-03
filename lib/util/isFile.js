const {Readable} = require("stream")

const isBuffer = Buffer.isBuffer

/**
 * @private
 */
const isFile = value => value instanceof Readable || isBuffer(value)

module.exports = isFile
