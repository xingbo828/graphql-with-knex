const {
  ApolloServer,
  ApolloError
} = require('apollo-server-fastify')
const fp = require('fastify-plugin')

const graphQL = async (server, { services, path }) => {
  const typeDefs = services.reduce((acc, service) => {
    const typeDef = server[service].graphQL.typeDefs
    return acc.concat([typeDef])
  }, [])
  const resolvers = services.reduce((acc, service) => {
    const resolver = server[service].graphQL.resolvers
    return acc.concat([resolver])
  }, [])

  const playgroundTabs = services.reduce((acc, service) => {
    const playgroundTab = {...server[service].graphQL.playgroundTab, endpoint: path }
    return acc.concat([playgroundTab])
  }, [])


  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
      settings: {
        'editor.theme': 'light',
      },
      tabs: playgroundTabs,
    },
    dataSources: () => ({ database: server.knex }),
    tracing: true
  })
  server.register(apollo.createHandler({ path }))
}

module.exports = fp(graphQL, {
  fastify: '>=1.1.0',
  name: 'graphQL'
}, {
  dependencies: ['knex']
})