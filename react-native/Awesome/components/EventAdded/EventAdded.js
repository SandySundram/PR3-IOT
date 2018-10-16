import React from "react"
import gql from "graphql-tag";
import { Subscription } from "react-apollo";
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
const EventAdded = () => (

  <Subscription subscription={EVENTS_SUBSCRIPTION}>
    {({ data }) => (
      <Text>New Event: {!data ? "...waiting" : data.eventAdded.message}</Text>
    )}
  </Subscription>
);

export default EventAdded