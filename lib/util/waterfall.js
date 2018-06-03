function waterfall(tasks, initial) {
  const fulfill = (prev, next) => Promise.resolve(prev).then(next)

  return tasks.reduce(fulfill, initial)
}

module.exports = waterfall
