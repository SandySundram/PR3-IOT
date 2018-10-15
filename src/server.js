const http = require("http");
const express = require("express");

const { ApolloServer, gql } = require("apollo-server-express");

const { PubSub } = require("apollo-server-express");
const pubsub = new PubSub();

const typeDefs = gql`
  type Subscription {
    postAdded: Post
  }
  type Query {
    posts: [Post]
  }
  type Mutation {
    addPost(author: String, comment: String): Post
  }
  type Post {
    author: String
    comment: String
  }
`;

const POST_ADDED = "POST_ADDED";

var posts = [];

const resolvers = {
  Subscription: {
    postAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([POST_ADDED])
    }
  },
  Query: {
    posts(root, args, context) {
      return posts;
      // return postController.posts();
    }
  },
  Mutation: {
    addPost(root, args, context) {
      pubsub.publish(POST_ADDED, { postAdded: args });
      posts.push(args);
      return args;
      // return postController.addPost(args);
    }
  }
};

const PORT = 4000;
const app = express();
const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${
      apolloServer.subscriptionsPath
    }`
  );
});
