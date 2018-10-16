import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

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
          <div>
            <button
              onClick={e => {
                e.preventDefault();
                mutateFunc({
                  variables: { topic: "TO_DEVICE", message: "001" }
                });
              }}
            >
              Send Message
            </button>
          </div>
        );
      }}
    </Mutation>
  );
};

export default CreateEvent;
