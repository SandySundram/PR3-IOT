import React from "react";
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";
import TurnOn from "../components/TurnOn/TurnOn";
import TurnOff from "../components/TurnOff/TurnOff";
import { removeToken } from "../auth";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome to the app!"
  };

  state = {};

  handleError = error => {
    this.setState({ error: error.toString() });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
        <Text>{this.state.error}</Text>
        <TurnOn onError={this.handleError} />
        <TurnOff onError={this.handleError} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };

  _signOutAsync = async () => {
    await removeToken();
    this.props.navigation.navigate("Auth");
  };
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
