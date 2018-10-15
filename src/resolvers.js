const { PubSub } = require("apollo-server-express");
const pubsub = new PubSub();

const POST_ADDED = "POST_ADDED";

let posts = [];

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

module.exports = {
  resolvers: resolvers,
  pubsub: pubsub
};
