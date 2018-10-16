import React from "react"
import gql from "graphql-tag";
import { Subscription } from "react-apollo";

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
      <h4>New Event: {!data ? "...waiting" : data.eventAdded.message}</h4>
    )}
  </Subscription>
);

export default EventAdded