import httpDriver from './drivers/http-driver'
import * as flow from 'lodash/flow'

const PORT = 1113

const hello = (req) => {
  return {
    body: `Hello ${req.payload.name}!`,
  }
}

const users = (req) => {
  return {
    body: [
      { name: 'Maciek', age: 29 },
      { name: 'Adam', age: 24 },
      { name: 'Monika', age: 21 },
    ]
  }
}

const log = (label) => (input) => {
  console.log(`${label}:`)
  console.dir(input, { colors: true, depth: null })
  return input;
}

httpDriver({
  hello: flow(
    log('before'),
    hello,
    log('after')
  ),
  users,
}, PORT)
