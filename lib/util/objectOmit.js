const flat = require("./arrayFlat")
const filter = require("./objectFilter")

function objectOmit(object, ...keys) {
  keys = flat(keys)

  return filter(object, (_, key) => keys.includes(key) === false)
}

module.exports = objectOmit
