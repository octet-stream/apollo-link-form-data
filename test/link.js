require("isomorphic-fetch")

const {Readable} = require("stream")
const {createReadStream} = require("fs")

const test = require("ava")

const {execute, makePromise} = require("apollo-link")

const mockFetch = require("fetch-mock")
const gql = require("graphql-tag")

const read = require("./__helper__/readStream")

const {createFormDataLink} = require("..")

const uri = "http://localhost:2319/graphql"
const dict = "/usr/share/dict/words"

test.beforeEach(t => t.context.mock = mockFetch.createInstance())

test.afterEach(t => t.context.mock.restore())

test("Should create a link without any argument", t => {
  t.plan(1)

  const trap = () => createFormDataLink()

  t.notThrows(trap)
})

test("Should always make a request with POST method", async t => {
  t.plan(1)

  const {mock} = t.context

  mock.post(uri, {
    data: {
      noop: null
    }
  })

  const query = gql`
    query {
      noop
    }
  `

  const link = createFormDataLink({uri, method: "GET"})

  await makePromise(execute(link, {query}))

  const [, {method}] = mock.lastCall()

  t.is(
    String(method).toLowerCase(), "post",
    "The POST method must be used for every request " +
    "even if different method was specified."
  )
})

test(
  "Should send a request with JSON body unless files were defined in variables",
  async t => {
    t.plan(4)

    const {mock} = t.context

    mock.post(uri, {
      data: {
        doNothing: null
      }
    })

    const query = gql`
      mutation DoNothing($noop: String!) {
        doNothing(noop: $noop)
      }
    `

    const variables = {
      noop: "noop"
    }

    const link = createFormDataLink({uri})

    await makePromise(execute(link, {query, variables}))

    const [, {headers, body}] = mock.lastCall()

    // Check headers
    t.true("content-type" in headers)
    t.is(String(headers["content-type"]).toLowerCase(), "application/json")

    // Check body
    t.true(typeof body === "string")
    t.is(JSON.parse(body).variables.noop, "noop")
  }
)

test(
  "Should send serialize body to FormData when variables have files",
  async t => {
    t.plan(3)

    const {mock} = t.context

    mock.post(uri, {
      data: {
        doNothing: null
      }
    })

    const query = gql`
      mutation DoNothing($file: File!) {
        doNothing(file: $file)
      }
    `

    const variables = {
      file: createReadStream(dict)
    }

    const link = createFormDataLink({uri})

    await makePromise(execute(link, {query, variables}))

    const [, {headers, body}] = mock.lastCall()

    t.true(body instanceof Readable)
    t.true(String(headers["content-type"]).startsWith("multipart/form-data;"))
    t.is(headers.accept, "*/*")
  }
)

test(
  "Should always serialize body to FormData with serialize.force option",
  async t => {
    t.plan(3)

    const {mock} = t.context

    mock.post(uri, {
      data: {
        doNothing: null
      }
    })

    const query = gql`
      mutation DoNothing($noop: String!) {
        doNothing(noop: $noop)
      }
    `

    const variables = {
      noop: "noop"
    }

    const link = createFormDataLink({uri, serialize: {force: true}})

    await makePromise(execute(link, {query, variables}))

    const [, {headers, body}] = t.context.mock.lastCall()

    t.true(body instanceof Readable)
    t.true(String(headers["content-type"]).startsWith("multipart/form-data;"))
    t.is(headers.accept, "*/*")
  }
)

test(
  "Should always serialize body to FormData with serialize.strict option " +
  "AND ignore all boolean values",
  async t => {
    t.plan(4)

    const {mock} = t.context

    mock.post(uri, {
      data: {
        doNothing: null
      }
    })

    const query = gql`
      mutation DoNothing($noop: String!) {
        doNothing(noop: $noop)
      }
    `

    const variables = {
      noop: "noop",
      boolean: false
    }

    const link = createFormDataLink({uri, serialize: {strict: true}})

    await makePromise(execute(link, {query, variables}))

    const [, {headers, body}] = t.context.mock.lastCall()

    t.true(body instanceof Readable)
    t.true(String(headers["content-type"]).startsWith("multipart/form-data;"))
    t.is(headers.accept, "*/*")

    // Review needed
    const actual = String(await read(body))
      .split(/\n/)
      .find(part => part.includes("form-data; name=\"variables[boolean]\""))

    t.falsy(actual)
  }
)
