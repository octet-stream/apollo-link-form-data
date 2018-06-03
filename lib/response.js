/**
 * @private
 */
function onResponse(resoponse) {
  if (resoponse.status >= 300) {
    throw new Error(`Network error: ${resoponse.status}`)
  }

  return resoponse.json()
}

module.exports = onResponse
