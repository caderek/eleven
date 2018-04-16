import express from "express"
import bodyParser from "body-parser"
import flow from "lodash/flow"

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

const toPromise = (val) => Promise.resolve().then(() => val)

// Handlers

const prepareQuery = (input) => {
  const id = input.params ? input.params.id : 1
  // console.log("----------------------------------:")
  // console.log("prepareQuery:")
  // console.dir(input, { colors: true, depth: null })
  return {
    payload: {
      query: `SELECT * FROM users WHERE userId = ${id}`,
    },
  }
}

const db = async (input) => {
  // console.log("----------------------------------:")
  // console.log("db:")
  // console.dir(input, { colors: true, depth: null })
  await delay(1000)
  return {
    payload: query(input.payload.query),
  }
}

const showResults = (input) => {
  // console.log("----------------------------------:")
  // console.log("showResults:")
  // console.dir(input, { colors: true, depth: null })
  return {
    body: input.payload,
  }
}

express()
  .use(bodyParser.json())
  .use(async (req, res) => {
    const requestSpec = req.body

    // const responseSpec = flow(prepareQuery, db, showResults)(requestSpec)
    const a = await toPromise(prepareQuery(requestSpec))
    const b = await toPromise(db(a))
    const responseSpec = await toPromise(showResults(b))

    if (!responseSpec.status) {
      responseSpec.status = "OK"
    }

    if (!responseSpec.body) {
      responseSpec.body = {}
    }

    res.send(responseSpec)
  })
  .listen(1118, () => {
    console.log("Listen on http://localhost:1118")
  })
