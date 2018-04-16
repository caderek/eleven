import httpDriver from "./drivers/http-driver/http-driver"
import { go } from "js-csp"
import { db, prepareQuery, showResults } from "./flow-chan"
import chans from "./chans"

const PORT = 1117

go(prepareQuery, [chans.requests, chans.queries])
go(db, [chans.queries, chans.dbResponses])
go(showResults, [chans.dbResponses, chans.httpResponses])

httpDriver(PORT)
