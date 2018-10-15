const fs = require("fs");
const http = require("http");
const express = require("express");

const { ApolloServer, gql } = require("apollo-server-express");

const { resolvers } = require("./resolvers");

const typeDefs = gql(
  fs.readFileSync(__dirname.concat("/schema.graphql"), "utf8")
);

const port = 4000;
const app = express();
const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(port, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${port}${
      apolloServer.subscriptionsPath
    }`
  );
});
