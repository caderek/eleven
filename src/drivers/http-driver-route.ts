const defaultHandler = (req) => {
  return {
    status: 'NOT OK',
    body: {
      message: `Route '${req.action}' does not exist`,
    }
  }
}

const route = (routes) => (requestSpec) => {
  if (!requestSpec.action) {
    return {
      body: {
        availableActions: Object.keys(routes),
      }
    }
  }

  return routes[requestSpec.action]
    ? routes[requestSpec.action](requestSpec)
    : defaultHandler(requestSpec)
}

export default route
