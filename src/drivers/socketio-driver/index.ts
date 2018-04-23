import socketIO from "socket.io"
import { run, take, putAsync } from "../../utils/channels"

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

      console.log("-----------------------------------------------")
      console.log("Socket.io initial request:")
      console.dir(initialRequestSpec, { colors: true, depth: null })

      putAsync(inputChan, initialRequestSpec)

      socket.on("input", (requestSpec) => {
        console.log("-----------------------------------------------")
        console.log("Socket.io request:")
        console.dir(requestSpec, { colors: true, depth: null })

        putAsync(inputChan, requestSpec)
      })

      run(
        (responseSpec) => {
          console.log("-----------------------------------------------")
          console.log("Socket.io response:")
          console.dir(responseSpec, { colors: true, depth: null })

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
