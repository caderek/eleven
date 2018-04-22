const query = (sql, bindings) => {
  const id = bindings.id
  ;(() => sql)() // @unused

  return [
    { id: 1, name: "Maciek" },
    { id: 2, name: "Adam" },
    { id: 3, name: "Monika" },
  ].filter((user) => user.id === id)[0]
}

export default query
