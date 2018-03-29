import { createServer } from 'http'
import * as jsonBody from 'body/json'
import { promisify } from 'util'
import route from './http-driver-route'

const parseBody = promisify(jsonBody)

type ResponseSpec = {
  status?: 'OK' | 'NOT OK',
  body?: Object,
}

type RequestSpec = {
  action: string,
  payload: any,
}

type Router = (requestSpec: RequestSpec) => ResponseSpec
type HttpDriver = (routes: any, port: number) => void

/** Creates server instance */
const httpDriver: HttpDriver = (routes, port) => {
  const server = createServer((req, res) => {
    parseBody(req)
      .catch(() => ({}))
      .then(requestSpec => {
        // @todo handle promise, observable, channel
        const responseSpec = route(routes)(requestSpec)

        if (!responseSpec.status) {
          responseSpec.status = 'OK'
        }

        if (!responseSpec.body) {
          responseSpec.body = {}
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(responseSpec))
      })
  })

  server.listen(port);
}

export default httpDriver