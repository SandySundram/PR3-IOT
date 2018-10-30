import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Platform, StyleSheet, Text, View, Button } from "react-native";

const CREATE_EVENT = gql`
  mutation CreateEvent($topic: String!, $message: String!) {
    createEvent(topic: $topic, message: $message) {
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

const CreateEvent = () => {
  return (
    <Mutation
      mutation={CREATE_EVENT}
      update={(cache, { data: { createEvent } }) => {
        const { events } = cache.readQuery({ query: EVENTS_QUERY });
        cache.writeQuery({
          query: EVENTS_QUERY,
          data: { events: events.concat([createEvent]) }
        });
      }}
    >
      {(mutateFunc, { data }) => {
        return (
          <View>
            <Button
              onPress={() => {
                mutateFunc({
                  variables: { topic: "TO_DEVICE", message: "001" }
                });
              }}
              title="Send Message"
            />
          </View>
        );
      }}
    </Mutation>
  );
};

export default CreateEvent;
