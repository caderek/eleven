import NATS from "nats"

const nats = NATS.connect("nats://localhost:4222")

nats.subscribe("nums", (val) => {
  console.dir(val, { colors: true, depth: null })
})

nats.publish("nums", "test 1")
