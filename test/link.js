const test = require("ava")

const {execute, makePromise} = require("apollo-link")

const mock = require("fetch-mock")
const gql = require("graphql-tag")

const {createFormDataLink} = require("..")

test.beforeEach(() => void mock.restore())

test("Should create a link without any argument", t => {
  t.plan(1)

  const trap = () => createFormDataLink()

  t.notThrows(trap)
})

test("Should always make a request with POST method", async t => {
  mock.post("http://localhost:2319/graphql", {
    data: {
      noop: null
    }
  })

  const query = gql`
    query {
      noop
    }
  `

  const link = createFormDataLink({
    uri: "http://localhost:2319/graphql",
    method: "GET"
  })

  await makePromise(execute(link, {query}))

  const [, {method}] = mock.lastCall()

  t.is(String(method).toLowerCase(), "post")
})
