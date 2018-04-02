import socketIO from "socket.io"
import route from "../../router/route"

const socketIODriver = (routes) => (server) => {
  const io = socketIO(server, { origins: "http://localhost:*" }).on(
    "connection",
    (socket) => {
      const responseSpec = route(routes)({
        action: "socketConnection",
        payload: {
          message: "Hello to Socket.io!",
          connectionId: socket.id,
        },
      })

      socket.emit("hello", responseSpec)
    },
  )

  return io
}

export default socketIODriver
