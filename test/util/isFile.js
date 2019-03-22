const {createReadStream} = require("fs")
const {Readable} = require("stream")

const test = require("ava")

const isFile = require("../../lib/util/isFile")

test("Returns true for given Buffer value", t => {
  t.true(isFile(Buffer.from(
    "I beat Twilight Sparkle and all I got was this lousy t-shirt."
  )))
})

test("Returns true for given Readable stream instance", t => {
  t.true(isFile(new Readable({read() { }})))
})

test("Returns true for given ReadStream instance", t => {
  t.true(isFile(createReadStream(__filename)))
})

test("Returns false for any other value", t => {
  t.false(isFile(
    "I beat Twilight Sparkle and all I got was this lousy t-shirt."
  ))
})
