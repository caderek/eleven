import { createServer } from "http"
import jsonBody from "body/json"
import { promisify } from "util"
import { go, take, putAsync } from "../../utils/channels"
import { log } from "../../utils/dev"

const parseBody = promisify(jsonBody)

type ResponseSpec = {
  status?: "OK" | "NOT OK"
  body?: object
}

type RequestSpec = {
  action: string
  payload: any
}

type HttpDriver = (port: number, inputChan: any, outputChan: any) => void

/**
 * Creates server instance
 *
 * @todo single input channel for http and socket.io?
 * @todo what about responseSpec - should it contain action name (for routing on client side (ws))
 */
const httpDriver: HttpDriver = (port, inputChan, outputChan) => {
  const server = createServer((req, res) => {
    parseBody(req)
      .catch(() => ({}))
      .then((requestSpec: RequestSpec) => {
        log("Express request:", requestSpec)

        putAsync(inputChan, requestSpec)

        go(function*() {
          const responseSpec: ResponseSpec = yield take(outputChan)

          log("Express response:", responseSpec)

          if (!responseSpec.status) {
            responseSpec.status = "OK"
          }

          if (!responseSpec.body) {
            responseSpec.body = {}
          }

          res.writeHead(200, {
            "Content-Type": "application/json",
          })
          res.end(JSON.stringify(responseSpec))
        })
      })
  })

  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
  })

  return server
}

export default httpDriver
