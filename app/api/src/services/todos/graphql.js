const { gql } = require('apollo-server-fastify')
const { readFileSync } = require('fs')
const { resolve } = require('path')

exports.typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    notes: String
    isCompleted: Boolean!
    category: String!
  }

  type Query {
    todos: [Todo]!
    todo(id:ID!): Todo
  }

  type Mutation {
    createTodo(values:TodoInput!): Todo
    deleteTodo(id:ID!): Todo
    updateTodo(id:ID!, values: TodoInput!): Todo
  }

  input TodoInput {
    title: String!
    notes: String!
    isCompleted: Boolean
    categoryId: Int!
  }
`

exports.resolvers = {
  Query: {
    todo: async (parent, { id }, { dataSources }) => {
      const data = await dataSources.database('todos').where({id})
      return data[0]
    },
    todos: async (parent, args, { dataSources }) => {
      const data = await dataSources.database('todos').select('*').orderBy('id')
      return data
    }
  },
  Mutation: {
    createTodo: async (parent, { values }, { dataSources }) => {
      const mappedValues = {
        notes: values.notes,
        title: values.title,
        category_id: values.categoryId,
        is_completed: values.isCompleted
      }
      const data = await dataSources.database('todos').insert({
        ...mappedValues
      }).returning('*')
      return data[0]
    },
    deleteTodo: async (parent, { id }, { dataSources }) => {
      const data = await dataSources.database('todos').where({ id }).delete().returning('*')
      return data[0]
    },
    updateTodo: async (parent, { id, values }, { dataSources }) => {
      const mappedValues = {
        notes: values.notes,
        title: values.title,
        category_id: values.categoryId,
        is_completed: values.isCompleted
      }
      const data = await dataSources.database('todos').where({ id }).update(mappedValues).returning('*')
      return data[0]
    }
  },
  Todo: {
    isCompleted(todo) {
      return todo.is_completed
    },
    async category(todo, args, { dataSources }) {
      if (todo.category_id) {
        const data = await dataSources.database('category').select('name', 'id').where({id: todo.category_id})
        return data.length ? data[0]['name'] : 'No Category'
      }
      return 'No Category'
    }
  }
}

exports.playgroundTab = {
  name: 'Todos',
  query: readFileSync(resolve(__dirname, 'playground.gql'), 'utf8')
}