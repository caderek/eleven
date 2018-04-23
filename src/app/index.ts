import httpDriver from "../drivers/http-driver"
import socketioDriver from "../drivers/socketio-driver"
import { db, prepareQuery, showResults, echo } from "./handlers"
import chans from "./chans"
import { run } from "../utils/channels"

const PORT = Number(process.env.PORT) || 1117

run(prepareQuery, {
  source: chans.httpRequests,
  sink: chans.queries,
})

run(db, {
  source: chans.queries,
  sink: chans.dbResponses,
})

run(showResults, {
  source: chans.dbResponses,
  sink: chans.httpResponses,
})

run(echo, {
  source: chans.socketioRequests,
  sink: chans.socketioResponses,
})

const server = httpDriver(PORT, chans.httpRequests, chans.httpResponses)

socketioDriver(server, chans.socketioRequests, chans.socketioResponses)
