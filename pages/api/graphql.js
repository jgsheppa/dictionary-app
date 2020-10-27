import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro';
require('dotenv').config();
const postgres = require('postgres');
const sql = postgres();

const typeDefs = gql`
  type Query {
    todo(id: String!): Todo
    todos(filteredCheck: Boolean): [Todo]
  }
  type User {
    name: String
    username: String
  }
  type Todo {
    id: String
    title: String
    checked: Boolean
  }
  type Mutation {
    createTodo(title: String!): Todo
  }
`;

async function getTodos() {
  return await sql`
select * from todos`;
}

const todos = [
  {
    id: '1',
    task: 'Shopping List',
    completed: false,
    rating: '5',
  },
  {
    id: '2',
    task: 'Vacuum',
    completed: true,
    rating: '4',
  },
  {
    id: '3',
    task: 'Clean Toilet',
    completed: false,
    rating: '1',
  },
];

const resolvers = {
  Query: {
    // users() {
    //   return users;
    // },
    // user(parent, { username }) {
    //   return users.find((user) => user.username === username);
    // },
    todos: (root, args) => {
      if (args.filteredCheck === true) {
        return todos.filter((todo) => todo.completed);
      } else if (args.filteredCheck === false) {
        return todos.filter((todo) => !todo.completed);
      } else {
        return getTodos();
      }
    },
    todo: (root, args, context) => {
      return todos.find((todo) => todo.id === args.id);
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({ schema }).createHandler({
  path: '/api/graphql',
});
