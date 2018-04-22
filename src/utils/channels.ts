import {
  go as rawGo,
  put as rawPut,
  chan as rawChan,
  take as rawTake,
  putAsync as rawPutAsync,
} from "js-csp"

export const loop = (fn) => {
  return function*(source, sink = null) {
    while (true) {
      const input = yield rawTake(source)
      const result = Promise.resolve().then(() => fn(input))

      if (sink) {
        result.then((output) => {
          rawPutAsync(sink, output)
        })
      }
    }
  }
}

export const go = rawGo
export const put = rawPut
export const take = rawTake
export const putAsync = rawPutAsync

export const chan = () => {
  return rawChan()
}

export const run = (handler, { source, sink }) => {
  rawGo(loop(handler), [source, sink])
}
