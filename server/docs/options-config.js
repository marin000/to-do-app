const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To do API',
      version: '1.0.0',
      description: 'To do List'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./**/*.yaml']
}

module.exports = { options }