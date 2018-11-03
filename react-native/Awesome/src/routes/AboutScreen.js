import React from "react";
import { Image } from "react-native";
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

class AboutScreen extends React.Component {
  static navigationOptions = {
    title: "About"
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
            <Title>About</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem bordered>
              <Left>
                <Thumbnail source={require("../assets/images/jslogo.png")} />
                <Body>
                  <Text>Espruino</Text>
                  <Text note>Javascript for Micro Controller Units</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={require("../assets/images/esp8266.jpg")}
                style={{ height: 200, width: null, flex: 1 }}
                resizeMode="center"
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  We are using a ESP8266 MCU which is a low-cost Wi-Fi microchip
                  with full TCP/IP stack and microcontroller capability.
                </Text>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem bordered>
              <Left>
                <Thumbnail source={require("../assets/images/jslogo.png")} />
                <Body>
                  <Text>Node.js</Text>
                  <Text note>Javascript for Servers</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={require("../assets/images/nodejs.png")}
                style={{ height: 200, width: null, flex: 1 }}
                resizeMode="contain"
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  On the backend, we have a GraphQL server with an embedded MQTT
                  broker. Components are apollo-server-express with
                  subscription, mosca and mongojs. MongoDB as our database.
                </Text>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem bordered>
              <Left>
                <Thumbnail source={require("../assets/images/jslogo.png")} />
                <Body>
                  <Text>React-Native</Text>
                  <Text note>Javascript for Mobile Devices</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={require("../assets/images/reactjs.png")}
                style={{ height: 200, width: null, flex: 1 }}
                resizeMode="center"
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  We are using react-native for mobile development. Apollo
                  client packages to handle graphql. React Navigation and Native
                  Base for UI.
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default AboutScreen;
