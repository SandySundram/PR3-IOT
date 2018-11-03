import React from "react";

import { StatusBar } from "react-native";

import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Thumbnail
} from "native-base";

import TurnOn from "../components/TurnOn/TurnOn";
import TurnOff from "../components/TurnOff/TurnOff";
import Indicator from "../components/Indicator/Indicator";
import { removeToken } from "../auth";

class HomeScreen extends React.Component {
  state = {};

  handleError = error => {
    this.setState({ error: error.toString() });
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Final Project</Title>
          </Body>
          <Right />
        </Header>
        <Content padder >
          <Text>{this.state.error}</Text>
          <TurnOn success onError={this.handleError} />
          <TurnOff danger style={{marginTop: 10}} onError={this.handleError} />
          <Indicator style={{marginTop: 10, alignSelf: "center"}} resizeMode="contain"/>
        </Content>
      </Container>
    );
  }
}

export default HomeScreen;
