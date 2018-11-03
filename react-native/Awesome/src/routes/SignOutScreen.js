import React from "react";
import {
  Button,
  Text,
  Container,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Footer,
  FooterTab
} from "native-base";

import { removeToken } from "../auth";

class SignOutScreen extends React.Component {
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
        </Header>
        <Content padder>
          <Text>Thank you for using our app.</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full warning onPress={this.signOut}>
              <Text>Sign Out</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  signOut = async () => {
    await removeToken();
    this.props.navigation.navigate("Auth");
  };
}

export default SignOutScreen;
