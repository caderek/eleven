import flow from "lodash/flow"

const prepareQuery = (req) => {
  return {
    payload: {
      query: `SELECT * FROM users WHERE userId = ${req.params.id}`,
    },
  }
}

const db = (req) => {
  const query = (sql) => {
    const id = Number(sql.slice(-1))

    return [
      { id: 1, name: "Maciek" },
      { id: 2, name: "Adam" },
      { id: 3, name: "Monika" },
    ].filter((user) => user.id === id)[0]
  }

  return {
    payload: query(req.payload.query),
  }
}

const showResults = (req) => {
  console.dir(req.payload, { colors: true, depth: null })
}

// const getUsers = (req) => {
//   return {
//     sink: '$self', // it's default when no sink specified?? What with multiple sinks?
//     before: 'callDatabase', // can be an array, eg. ['db', 'logger']
//     payload: {
//       query: 'SELECT * FROM users;'
//     }
//   }
// }

// const sendUsers = (req) => {

// }

// statefull middleware idea (simple closure):

// const composed = () => {
//   const start = Date.now()

//   return _.flow(
//     doA(...deps),
//     doB,
//     doC,
//     () => {
//       const stop = Date.now()
//       console.log(`Request time ${start - stop} ms`)
//     }
//   )
// }

const getUsers = flow(prepareQuery, db, showResults)

getUsers({
  params: {
    id: 3,
  },
})
