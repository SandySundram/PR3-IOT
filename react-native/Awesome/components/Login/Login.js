import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: "",
    password: "",
    name: ""
  };

  render() {
    const { login, email, password, name } = this.state;
    return (
      <View>
        <Text>{login ? "Login" : "Sign Up"}</Text>
        {!login && (
          <>
            <Text>Name</Text>
            <TextInput
              style={{ height: 40, backgroundColor: "powderblue" }}
              value={name}
              onChangeText={name => this.setState({ name })}
            />
          </>
        )}

        <Text>Email</Text>
        <TextInput
          style={{ height: 40, backgroundColor: "powderblue" }}
          value={email}
          onChangeText={t => this.setState({ email: t })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text>Password</Text>
        <TextInput
          style={{ height: 40, backgroundColor: "powderblue" }}
          value={password}
          onChangeText={t => this.setState({ password: t })}
          secureTextEntry={true}
        />

        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          onCompleted={data => this._confirm(data)}
          onError={error => this._showError(error)}
        >
          {mutateFunc => (
            <TouchableOpacity
              onPress={() => {
                mutateFunc({ variables: { email, password, name } });
              }}
            >
              <Text>{login ? "Login" : "Sign Up"}</Text>
            </TouchableOpacity>
          )}
        </Mutation>
        <TouchableOpacity onPress={() => this.setState({ login: !login })}>
          <Text>
            {login ? "Need to create an account?" : "Already have an account?"}
          </Text>
        </TouchableOpacity>

        <View><Text>{this.state.error}</Text></View>
      </View>
    );
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup;
    this._storeData(token);
    this.props.onSucceed();
  };

  _showError = error => {
    console.log("[Inside _showError]")
    this.setState({error: error.toString()})
  }

  _storeData = async token => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      // Error saving data
    }
  };
}

export default Login;