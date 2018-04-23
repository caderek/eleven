import { chan } from "../utils/channels"

export default {
  httpRequests: chan(),
  httpResponses: chan(),
  socketioRequests: chan(),
  socketioResponses: chan(),
  queries: chan(),
  dbResponses: chan(),
}
