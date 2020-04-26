require('dotenv').config()
const fastify = require('fastify')({
  logger: true
})

const knexPlugin = require('./plugins/knex')
const graphqlPlugin = require('./plugins/graphql')
const todos = require('./services/todos')

fastify.register(knexPlugin, {
  client: 'pg',
  connection: {
    host : process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  }
})

fastify.register(todos)

fastify.register(graphqlPlugin, { path: '/graphql', services: ['todos'] })

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()