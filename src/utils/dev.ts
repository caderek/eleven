export const log = (message, data, depth = null) => {
  console.log("-----------------------------------------------")
  console.log(message)
  console.dir(data, { colors: true, depth })
}
