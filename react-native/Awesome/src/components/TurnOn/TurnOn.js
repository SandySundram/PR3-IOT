import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
  Button,
  Text
} from "native-base";

const CREATE_EVENT = gql`
  mutation TurnOnWithAuth {
    turnOnWithAuth {
      _id
      topic
      message
    }
  }
`;

const TurnOn = (props) => {
  return (
    <Mutation mutation={CREATE_EVENT} onError={error => props.onError(error)}>
      {(mutateFunc, { data }) => {
        return (
            <Button
              {...props}
              onPress={() =>
                mutateFunc({
                  variables: {}
                })
              }
              title="Turn On"
            ><Text>Turn On</Text></Button>
        );
      }}
    </Mutation>
  );
};

export default TurnOn;
