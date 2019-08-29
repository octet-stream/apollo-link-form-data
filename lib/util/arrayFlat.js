const isArray = Array.isArray

function flat(array, depth = 1) {
  const walk = (prev, next) => (
    prev.concat(isArray(next) && depth > 0 ? flat(next, depth - 1) : [next])
  )

  return array.reduce(walk, [])
}

module.exports = flat
