const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PubSub } = require("apollo-server-express");

const Event = require("./models/event");
const User = require("./models/user");

const pubsub = new PubSub();

const TO_DEVICE = "TO_DEVICE";
const FROM_DEVICE = "FROM_DEVICE";

const resolvers = {
  Subscription: {
    eventAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([FROM_DEVICE])
    }
  },
  Query: {
    async events(root, args, context) {
      const events = await Event.read(context.db, args);
      return events;
      // return postController.posts();
    },
    feed: () => "Test feed"
  },
  Mutation: {
    async createEvent(root, args, context) {
      const newEvent = await Event.create(context.db, args);
      // pubsub.publish(TO_DEVICE, { eventAdded: newEvent });
      context.moscaServer.publish({
        topic: newEvent.topic,
        payload: newEvent.message
      });
      return newEvent;
      // return postController.addPost(args);
    },
    async signup(root, args, context) {
      const password = await bcrypt.hash(args.password, 10);
      const user = await User.create(context.db, {
        ...args,
        password: password
      });
      const token = jwt.sign({ userId: user._id }, "secret");
      return {
        token,
        user
      };
    },
    async login(root, args, context) {
      const user = await User.user(context.db, { email: args.email });
      if (!user) {
        throw new Error("No such user found");
      }

      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ userId: user._id }, "secret");
      return {
        token,
        user
      };
    }
  },
  AuthPayload: {
    async user(root, args, context) {
      return await User.user(context.db, { _id: root.user._id });
    }
  }
};

module.exports = {
  resolvers: resolvers,
  pubsub: pubsub
};
