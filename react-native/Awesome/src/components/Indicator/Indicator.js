import React from "react";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";
import { Platform, StyleSheet, Text, View, Animated } from "react-native";

const EVENTS_SUBSCRIPTION = gql`
  subscription {
    eventAdded {
      _id
      topic
      message
    }
  }
`;

class Indicator extends React.Component {
  state = {
    animatedValue: new Animated.Value(0)
  };

  render() {
    const spin = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    return (
      <Subscription 
        subscription={EVENTS_SUBSCRIPTION} 
        onSubscriptionData={this.handleSubscriptionData}>
        {({ data }) => {
          if (data) {
            this.animate();
          }
          return (
            <Animated.Image
              {...this.props}
              style={{
                ...this.props.style,
                width: 227,
                height: 200,
                transform: [{ rotate: spin }]
              }}
              source={require('../../assets/images/reactjs.png')}
            />
          );
        }}
      </Subscription>
    );
  }

  animate = () => {
    Animated.timing(
      // Animate over time
      this.state.animatedValue, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 4000 // Make it take a while
      }
    ).start();
  };

  // reset 
  handelSubscriptionData = () => {
    this.state.animatedValue.setValue(0)
  }
}

export default Indicator;
//         <Text>New Event: {!data ? "...waiting" : data.eventAdded.message}</Text>
/*
{
                uri:
                  "https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png"
              }
*/
