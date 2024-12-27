const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const bodyParser = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const { default: axios } = require("axios");
async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
     type User {
        id : ID!
        name: String!
        username: String!
        email: String!
        phone: String!
        website: String!
      }


      type Todo {
        id : ID!
        title: String!
        completed: Boolean
      }

      type Query {
      getTodos: [Todo]
      getAllUsers: [User]
    }

    `,
    resolvers: {
      Query: {
        getTodos: async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
          );
          return response.data;
        },
        getAllUsers: async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          return response.data;
        },
      },
    },
  });

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => {
    console.log("Server running on http://localhost:8000/graphql");
  });
}

startApolloServer();startApolloServer
