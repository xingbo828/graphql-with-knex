import { gql } from 'apollo-boost';

export const GET_TODOS = gql`
  query {
    todos {
      id
      title
      isCompleted
      category
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($values: TodoInput!) {
    createTodo(values: $values) {
      id
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;
