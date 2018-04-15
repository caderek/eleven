import { chan, spawn, go, take, putAsync } from "js-csp"

// DB driver stub
const query = (sql) => {
  const id = Number(sql.slice(-1))

  return [
    { id: 1, name: "Maciek" },
    { id: 2, name: "Adam" },
    { id: 3, name: "Monika" },
  ].filter((user) => user.id === id)[0]
}

// Channels

const requests = chan()
const queries = chan()
const dbResponses = chan()

// Helper functions

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const loop = (fn) => {
  return function*(source, sink = null) {
    while (true) {
      const input = yield take(source)
      const result = Promise.resolve().then(() => fn(input))

      if (sink) {
        result.then((output) => {
          putAsync(sink, output)
        })
      }
    }
  }
}

// Handlers

const prepareQuery = loop((input) => {
  return {
    payload: {
      query: `SELECT * FROM users WHERE userId = ${input.params.id}`,
    },
  }
})

const db = loop(async (input) => {
  await delay(2000)
  return {
    payload: query(input.payload.query),
  }
})

const showResults = loop((input) => {
  console.dir(input.payload, { colors: true, depth: null })
})

// Spawn

go(prepareQuery, [requests, queries])
spawn(db(queries, dbResponses))
spawn(showResults(dbResponses))

// Fake requests - super easy to test (create request builder for each protocol?), add request creator!

putAsync(requests, {
  params: {
    id: 2,
  },
})

// @goal
// Minimize async code in users code, abstract away asynchronous code via channels
