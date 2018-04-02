import { createServer } from "http"
import jsonBody from "body/json"
import { promisify } from "util"
import route from "../../router/route"

const parseBody = promisify(jsonBody)

type ResponseSpec = {
  status?: "OK" | "NOT OK"
  body?: object
}

type RequestSpec = {
  action: string
  payload: any
}

type HttpDriver = (routes: any) => (port: number) => void

/** Creates server instance */
const httpDriver: HttpDriver = (routes) => (port) => {
  const server = createServer((req, res) => {
    parseBody(req)
      .catch(() => ({}))
      .then((requestSpec: RequestSpec) => {
        const responseSpec: ResponseSpec = route(routes)(requestSpec)

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

  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
  })

  return server
}

export default httpDriver
