import httpDriver from "./drivers/http-driver/http-driver"
import socketIODriver from "./drivers/socketio-driver/socketio-driver"
import _ from "lodash"

const PORT = 1115

const hello = (req) => {
  return {
    body: `Hello ${req.payload.name}!`,
  }
}

const users = () => {
  return {
    body: [
      { name: "Maciek", age: 29 },
      { name: "Adam", age: 24 },
      { name: "Monika", age: 21 },
    ],
  }
}

const log = (label) => (input) => {
  console.log(`${label}:`)
  console.dir(input, { colors: true, depth: null })
  return input
}

const socketConnection = (req) => {
  console.dir(req, { colors: true, depth: null })
  return {
    body: {
      message: `Hello, your ID is: ${req.payload.connectionId}`,
    },
  }
}

const routes = {
  hello,
  users,
  socketConnection,
}

_.flow(httpDriver(routes), socketIODriver(routes))(PORT)
