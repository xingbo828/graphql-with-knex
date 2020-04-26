const { gql } = require('apollo-server-fastify')
const { readFileSync } = require('fs')
const { resolve } = require('path')

exports.typeDefs = gql`
  input TodoInput {
    "Partial update on an existing todo"
    title: String
    notes: String
  }

  type Todo {
    id: ID!
    title: String!
    notes: String
  }

  type Query {
    todos: [Todo]!
    todo(id:ID!): Todo
  }

  type Mutation {
    createTodo(title:String!): Todo
    deleteTodo(id:ID!): Todo
    updateTodo(id:ID!, values: TodoInput!): Todo
  }
`

exports.resolvers = {
  Query: {
    todo: async (parent, { id }, { dataSources }) => {
      const data = await dataSources.todos.where({ id })
      return data[0]
    },
    todos: async (parent, args, { dataSources }) => {
      const data = await dataSources.todos.select('*').orderBy('id')
      return data
    }
  },
  Mutation: {
    createTodo: async (parent, { title }, { dataSources }) => {
      const data = await dataSources.todos.insert({
        title
      }).returning('*')
      return data[0]
    },
    deleteTodo: async (parent, { id }, { dataSources }) => {
      const data = await dataSources.todos.where({ id }).delete().returning('*')
      return data[0]
    },
    updateTodo: async (parent, { id, values }, { dataSources }) => {
      const data = await dataSources.todos.where({ id }).update(values).returning('*')
      return data[0]
    }
  }
}

exports.playgroundTab = {
  name: 'Todos',
  query: readFileSync(resolve(__dirname, 'playground.gql'), 'utf8')
}