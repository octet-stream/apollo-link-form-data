const {createReadStream} = require("fs")

const test = require("ava")

const hasFiles = require("../../lib/util/hasFiles")

test("Returns true when given object have at least one file", t => {
  t.true(hasFiles({
    someField: "value",
    someOtherField: createReadStream(__filename)
  }))
})

test("Returns true when given array have at least one file", t => {
  t.true(hasFiles(["some text", 451, createReadStream(__filename)]))
})

test("Returns true when files found on object with nested fields", t => {
  t.true(hasFiles({
    someField: "value",
    someOtherField: {
      nested: createReadStream(__filename)
    }
  }))
})

test("Returns true when files found on object with array nested fields", t => {
  t.true(hasFiles({
    someField: "value",
    someOtherField: {
      nested: ["some text", 42, createReadStream(__filename)]
    }
  }))
})

test("Returns true when files found in given collection", t => {
  t.true(hasFiles([
    {
      name: "Some field",
      value: createReadStream(__filename)
    },
    {
      name: "Some other field",
      value: null
    }
  ]))
})

test("Returns false when called without arguments", t => {
  t.false(hasFiles())
})

test("Returns false for empty object", t => {
  t.false(hasFiles({}))
})

test("Returns false for empty array", t => {
  t.false(hasFiles([]))
})

test("Returns false when there are no files in given object", t => {
  t.false(hasFiles({someField: "value"}))
})

test("Returns false when there are no files in given array", t => {
  t.false(hasFiles(["Testing", "testing", 1, 2, 3]))
})

test(
  "Returns false when there are no files on object with nested fields",
  t => {
    t.false(hasFiles({
      someField: "value",
      someOtherField: {
        nested: "another value"
      }
    }))
  }
)

test(
  "Returns false when there are no files on object with array nested fields",
  t => {
    t.false(hasFiles({
      someField: "value",
      someOtherField: {
        nested: ["another value", null]
      }
    }))
  }
)

test("Returns flase when there are no files found in given collection", t => {
  t.false(hasFiles([
    {
      name: "Some field",
      value: null
    },
    {
      name: "Some other field",
      value: "In Soviet Moon, landscape see binoculars through YOU"
    }
  ]))
})
