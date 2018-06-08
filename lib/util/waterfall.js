/**
 * @private
 */
function waterfall(tasks, initial) {
  const step = (prev, next) => new Promise((resolve, reject) => {
    Promise.resolve(prev).then(res => resolve(next(res))).catch(reject)
  })

  if (tasks.length <= 1) {
    return step(initial, tasks[0])
  }

  return tasks.reduce(step, initial)
}

module.exports = waterfall
