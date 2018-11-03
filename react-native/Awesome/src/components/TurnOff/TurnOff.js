import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
  Button,
  Text
} from "native-base";

const CREATE_EVENT = gql`
  mutation TurnOffWithAuth {
    turnOffWithAuth {
      _id
      topic
      message
    }
  }
`;

const TurnOff = (props) => {
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
          ><Text>Turn Off</Text></Button>
        );
      }}
    </Mutation>
  );
};

export default TurnOff;
