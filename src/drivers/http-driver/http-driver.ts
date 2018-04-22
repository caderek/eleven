import { createServer } from "http"
import jsonBody from "body/json"
import { promisify } from "util"
import { go, take, putAsync } from "../../utils/channels"

const parseBody = promisify(jsonBody)

type ResponseSpec = {
  status?: "OK" | "NOT OK"
  body?: object
}

type RequestSpec = {
  action: string
  payload: any
}

type HttpDriver = (port: number, requestChan: any, responseChan: any) => void

/** Creates server instance */
const httpDriver: HttpDriver = (port, requestChan, responseChan) => {
  const server = createServer((req, res) => {
    parseBody(req)
      .catch(() => ({}))
      .then((requestSpec: RequestSpec) => {
        console.log("-----------------------------------------------")
        console.log("Express request:")
        console.dir(requestSpec, { colors: true, depth: null })

        putAsync(requestChan, requestSpec)

        go(function*() {
          const responseSpec: ResponseSpec = yield take(responseChan)

          console.log("-----------------------------------------------")
          console.log("Express response:")
          console.dir(responseSpec, { colors: true, depth: null })

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
