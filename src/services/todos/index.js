const fp = require('fastify-plugin')

module.exports = fp((fastify, options, done) => {
  fastify.decorate('todos', {
    graphQL: require('./graphql'),
    dataSource: { todos: fastify.knex('todos') }
  })
  done()
}, {
  dependencies: ['knex']
})