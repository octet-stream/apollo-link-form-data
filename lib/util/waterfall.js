/**
 * @private
 */
function waterfall(tasks, initial) {
  if (tasks.length <= 1) {
    try {
      const [task] = tasks

      return Promise.resolve(task(initial))
    } catch (err) {
      return Promise.reject(err)
    }
  }

  const fulfill = (prev, next) => Promise.resolve(prev).then(next)

  return tasks.reduce(fulfill, initial)
}

module.exports = waterfall
