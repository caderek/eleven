import { chan } from "../utils/channels"

export default {
  requests: chan(),
  queries: chan(),
  dbResponses: chan(),
  httpResponses: chan(),
}
