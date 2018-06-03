/**
 * @private
 */
const isFile = value => (
  !!(value instanceof File || value instanceof FileList)
)

module.exports = isFile
