const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { bodyParser } = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
      type Todo {
        id : ID!
        title: String!
        completed: Boolean
      }

      type Query {
      getTodos: [Todo]
    }

    `,
  });

  app.use(cors());
  app.use(bodyParser.json());
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => {
    console.log("Server running on http://localhost:8000/graphql");
  });
}

startApolloServer();
