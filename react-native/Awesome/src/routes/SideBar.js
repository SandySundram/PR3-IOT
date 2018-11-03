import React from "react";
import { SafeAreaView, Image, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
const routes = ["Home", "About", "Sign Out"];

export default class SideBar extends React.Component {
  render() {
    return (
      <SafeAreaView
        style={{ flex: 1 }}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <Container>
          <Content>
            <Image
              source={require("../assets/images/background.jpg")}
              style={{
                height: 120,
                width: "100%",
                alignSelf: "stretch",
                position: "absolute"
              }}
            />
            <Image
              square
              style={{
                height: 80,
                width: 80,
                position: "absolute",
                alignSelf: "center",
                top: 20
              }}
              source={require("../assets/images/user.png")}
            />
            <List
              dataArray={routes}
              contentContainerStyle={{ marginTop: 120 }}
              renderRow={data => {
                return (
                  <ListItem
                    button
                    onPress={() => this.props.navigation.navigate(data)}
                  >
                    <Text>{data}</Text>
                  </ListItem>
                );
              }}
            />
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}
