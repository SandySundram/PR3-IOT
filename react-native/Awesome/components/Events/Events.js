import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Platform, StyleSheet, Text, View } from "react-native";

const EVENTS_SUBSCRIPTION = gql`
  subscription {
    eventAdded {
      _id
      topic
      message
    }
  }
`;

const EVENTS_QUERY = gql`
  query {
    events {
      _id
      topic
      message
    }
  }
`;

let unsubscribe = null;

const Events = () => (
  <Query query={EVENTS_QUERY}>
    {({ loading, data, subscribeToMore }) => {
      if (loading) {
        return null;
      }

      if (!unsubscribe) {
        unsubscribe = subscribeToMore({
          document: EVENTS_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const { eventAdded } = subscriptionData.data;
            console.log(subscriptionData.data);
            console.log(prev);
            return {
              ...prev,
              events: [...prev.events, eventAdded]
            };
          }
        });
      }
      return (
        <View>
          {data.events.map(x => (
            <Text key={x._id}>
              {x._id}-{x.topic}-{x.message}
            </Text>
          ))}
        </View>
      );
    }}
  </Query>
);

export default Events;
