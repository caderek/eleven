# Eleven - Node.js protocol-agnostic framework

## Ideas

* locals like username account-domain added automatically (headers? requestSpec?)
* broadcasting, http-req/http-res, fire and forget, http-req/http-req, queue/queue, combinations, multi sources and sinks,

## Todo

* authentication and authorization, JWT, OAuth2,
* unify api for http, ws and queues,
* check usage of channels,
* what about routing and headers? Should we use them? header Authorization??
* what about database access? datalog? datomic?
* Scheduling! Without cron or other non-js solution
* routing in terms of channels/rooms/queues names
* if route/action does not exist check other nodes (miscroservices etc)
* handle promise, observable, channel as response
