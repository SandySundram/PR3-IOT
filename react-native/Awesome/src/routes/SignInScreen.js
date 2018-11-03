import React from "react";
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import Login from "../components/Login/Login";
import { saveToken } from "../auth";

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: "Please sign in or sign up"
  };

  render() {
    return (
      <Login onSucceed={this.handleSucceed} />
    );
  }

  handleSucceed = async token => {
    await saveToken(token);
    this.props.navigation.navigate("App");
  };
}

export default SignInScreen;
