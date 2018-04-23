import socketIO from "socket.io"
import { run, take, putAsync } from "../../utils/channels"
import { log } from "../../utils/dev"

const socketioDriver = (server, inputChan, outputChan) => {
  const io = socketIO(server, { origins: "http://localhost:*" }).on(
    "connection",
    (socket) => {
      const initialRequestSpec = {
        action: "socketConnection",
        payload: {
          message: "Hello to Socket.io!",
          connectionId: socket.id,
        },
      }

      log("Socket.io initial request:", initialRequestSpec)

      putAsync(inputChan, initialRequestSpec)

      socket.on("input", (requestSpec) => {
        log("Socket.io request:", requestSpec)

        putAsync(inputChan, requestSpec)
      })

      run(
        (responseSpec) => {
          log("Socket.io response:", responseSpec)

          socket.emit("input", responseSpec)
        },
        {
          source: outputChan,
          sink: null,
        },
      )
    },
  )

  return io
}

export default socketioDriver
