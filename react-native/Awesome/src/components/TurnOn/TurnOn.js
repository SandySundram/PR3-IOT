import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Platform, StyleSheet, Text, View, Button } from "react-native";

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
          <View>
            <Button
              onPress={() =>
                mutateFunc({
                  variables: {}
                })
              }
              title="Turn On"
            />
          </View>
        );
      }}
    </Mutation>
  );
};

export default TurnOn;
