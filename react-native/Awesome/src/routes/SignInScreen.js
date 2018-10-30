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
    title: "Please sign in"
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Button title="Sign in!" onPress={this._signInAsync} /> */}
        <Login onSucceed={this.handleSucceed} />
      </View>
    );
  }

  handleSucceed = async token => {
    await saveToken(token);
    this.props.navigation.navigate("App");
  };
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
