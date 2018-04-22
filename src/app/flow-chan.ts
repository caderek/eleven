// import { delay } from "../utils/async"
import query from "../io/query"

export const prepareQuery = (input) => {
  const id = input.id

  return {
    payload: {
      query: `SELECT * FROM users WHERE userId = :id`,
      bindings: {
        id,
      },
    },
  }
}

export const db = async (input) => {
  return {
    payload: query(input.payload.query, input.payload.bindings),
  }
}

export const showResults = (input) => {
  return {
    body: input.payload,
  }
}
