import httpDriver from "../drivers/http-driver/http-driver"
import { db, prepareQuery, showResults } from "./flow-chan"
import chans from "./chans"
import { run } from "../utils/channels"

const PORT = 1117

run(prepareQuery, {
  source: chans.requests,
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

httpDriver(PORT, chans.requests, chans.httpResponses)
