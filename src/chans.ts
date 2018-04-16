import { chan } from "js-csp"

export default {
  requests: chan(),
  queries: chan(),
  dbResponses: chan(),
  httpResponses: chan(),
}
