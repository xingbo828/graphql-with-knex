const fp = require('fastify-plugin')
const knex = require('knex')

module.exports = fp((fastify, options, next) => {
  const con = knex(options)
  fastify.decorate('knex', con)
  next()
}, {
  fastify: '>=1.1.0',
  name: 'knex'
})