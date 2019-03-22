const {createReadStream} = require("fs")
const {Readable} = require("stream")

const test = require("ava")
const pq = require("proxyquire")
const FormData = require("formdata-node").default

const makePayload = require("../../lib/util/makeFetcherPayload")

const paramsTemplate = {
  mode: {},
  body: {
    operationName: undefined,
    query: "",
    variables: {}
  },
}

function isJSONValid(string) {
  try {
    JSON.parse(string)

    return true
  } catch (_) {
    return false
  }
}

test(
  "Returns a JSON payload request when request have no variables",
  async t => {
    const expected = {
      body: JSON.stringify(paramsTemplate.body),
      headers: {
        "content-type": "application/json"
      }
    }

    const actual = await makePayload(paramsTemplate)

    t.deepEqual(expected, actual)
    t.true(isJSONValid(actual.body))
  }
)

test("Returns a JSON payload when body does not contain files", async t => {
  const params = {
    ...paramsTemplate,

    body: {
      ...paramsTemplate.body,

      variables: {
        text: "I beat Twilight Sparkle and all I got was this lousy t-shirt."
      }
    }
  }

  const actual = await makePayload(params)

  t.true(isJSONValid(actual.body))
})

test("Returns form-data payload whrn body have at least one file", async t => {
  const fd = new FormData()
  const mockedMakePayload = pq("../../lib/util/makeFetcherPayload", {
    "@octetstream/object-to-form-data": () => fd
  })

  const params = {
    ...paramsTemplate,

    body: {
      ...paramsTemplate.body,

      variables: {
        file: createReadStream(__filename)
      }
    }
  }

  const expected = {
    ...fd.headers,

    "content-length": await fd.getComputedLength(),
    accept: "*/*"
  }

  const actual = await mockedMakePayload(params)

  t.true(actual.body instanceof Readable)
  t.is(fd.stream, actual.body)
  t.deepEqual(expected, actual.headers)

  t.pass()
})

test(
  "Always returns form-data payload when force mode is set",
  async t => {
    const fd = new FormData()
    const mockedMakePayload = pq("../../lib/util/makeFetcherPayload", {
      "@octetstream/object-to-form-data": () => fd
    })

    const params = {
      ...paramsTemplate,

      mode: {
        force: true
      },
      body: {
        ...paramsTemplate.body,

        variables: {
          text: "Some text"
        }
      }
    }

    const expected = {
      ...fd.headers,

      "content-length": await fd.getComputedLength(),
      accept: "*/*"
    }

    const actual = await mockedMakePayload(params)

    t.true(actual.body instanceof Readable)
    t.is(fd.stream, actual.body)
    t.deepEqual(expected, actual.headers)
  }
)

test(
  "Always returns form-data payload strict mode as well as in force",
  async t => {
    const fd = new FormData()
    const mockedMakePayload = pq("../../lib/util/makeFetcherPayload", {
      "@octetstream/object-to-form-data": () => fd
    })

    const params = {
      ...paramsTemplate,

      mode: {
        strict: true
      },
      body: {
        ...paramsTemplate.body,

        variables: {
          text: "Some text"
        }
      }
    }

    const expected = {
      ...fd.headers,

      "content-length": await fd.getComputedLength(),
      accept: "*/*"
    }

    const actual = await mockedMakePayload(params)

    t.true(actual.body instanceof Readable)
    t.is(fd.stream, actual.body)
    t.deepEqual(expected, actual.headers)
  }
)
