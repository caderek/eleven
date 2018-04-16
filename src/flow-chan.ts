import { spawn, go, take, putAsync } from "js-csp"

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

// Helper functions

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const loop = (fn) => {
  return function*(source, sink = null) {
    while (true) {
      const input = yield take(source)
      const result = Promise.resolve().then(() => fn(input))

      // console.log("----------------------------------:")
      // console.log("Sink:")
      // console.dir(sink, { colors: true, depth: 0 })

      if (sink) {
        result.then((output) => {
          putAsync(sink, output)
        })
      }
    }
  }
}

// Handlers

export const prepareQuery = loop((input) => {
  const id = input.params ? input.params.id : 1
  // console.log("----------------------------------:")
  // console.log("prepareQuery:")
  // console.dir(input, { colors: true, depth: null })
  return {
    payload: {
      query: `SELECT * FROM users WHERE userId = ${id}`,
    },
  }
})

export const db = loop(async (input) => {
  // console.log("----------------------------------:")
  // console.log("db:")
  // console.dir(input, { colors: true, depth: null })
  await delay(1000)
  return {
    payload: query(input.payload.query),
  }
})

export const showResults = loop((input) => {
  // console.log("----------------------------------:")
  // console.log("showResults:")
  // console.dir(input, { colors: true, depth: null })
  return {
    body: input.payload,
  }
})

// Fake requests - super easy to test (create request builder for each protocol?), add request creator!

// putAsync(chans.requests, {
//   params: {
//     id: 2,
//   },
// })

// @goal
