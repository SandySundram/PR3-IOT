import React, { Component } from "react";
//import { Text, View, TextInput, TouchableOpacity } from "react-native";
import {
  Container,
  Button,
  Content,
  Form,
  Item,
  Input,
  Text
} from "native-base";
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
      <Container>
        <Content padder>
          <Form>
            {!login && (
              <Item>
                <Input
                  placeholder="Name"
                  onChangeText={value => this.handleInputChange("email", value)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </Item>
            )}

            <Item>
              <Input
                placeholder="Email"
                onChangeText={value => this.handleInputChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            <Item>
              <Input
                placeholder="Password"
                onChangeText={value =>
                  this.handleInputChange("password", value)
                }
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
              />
            </Item>
          </Form>

          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            onCompleted={data => this.handleCompleted(data)}
            onError={error => this.handleError(error)}
          >
            {mutateFunc => (
              <Button
                block
                style={{ marginTop: 10 }}
                onPress={() => {
                  mutateFunc({ variables: { email, password, name } });
                }}
              >
                <Text>{login ? "Sign In" : "Sign Up"}</Text>
              </Button>
            )}
          </Mutation>

          <Button
            block
            info
            style={{ marginTop: 10 }}
            onPress={() => this.setState({ login: !login })}
          >
            <Text>
              {login
                ? "Need to create an account?"
                : "Already have an account?"}
            </Text>
          </Button>

          <Text>{this.state.error}</Text>
        </Content>
      </Container>
    );
  }

  handleInputChange = (field, value) => {
    const newState = {
      ...this.state,
      [field]: value
    };
    this.setState(newState);
  };

  handleCompleted = async data => {
    const { token } = this.state.login ? data.login : data.signup;
    this.props.onSucceed(token);
  };

  handleError = error => {
    this.setState({ error: error.toString() });
  };
}

export default Login;
