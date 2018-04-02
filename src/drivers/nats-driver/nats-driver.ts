import * as NATS from "nats"

const nats = NATS.connect("nats://localhost:4222")

nats.subscribe("nums", (val) => {
  console.dir(val, { colors: true, depth: null })
})

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const go = async () => {
  await delay(1000)
  nats.publish("nums", "test 1")
  await delay(2000)
  nats.publish("nums", "test 2")
  await delay(100)
  nats.publish("nums", "test 3")
  await delay(500)
  nats.publish("nums", "test 4")
}

go()
