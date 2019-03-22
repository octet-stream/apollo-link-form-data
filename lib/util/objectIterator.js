/**
 * @api private
 */
class ObjectIterator {
  constructor(iterable) {
    [Symbol.iterator, "keys", "values", "entries"]
      .forEach(name => this[name] = this[name].bind(this))

    this.__iterable = iterable
  }

  keys() {
    if (!this.__iterable) {
      return []
    }

    return Object.keys(this.__iterable)
  }

  * values() {
    for (const [, value] of this.entries()) {
      yield value
    }
  }

  * entries() {
    for (const key of this.keys()) {
      const value = this.__iterable[key]

      yield [key, value]
    }
  }

  [Symbol.iterator]() {
    return this.values()
  }
}

const objectIterator = iterable => new ObjectIterator(iterable)

module.exports = objectIterator
