import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";

import HomeScreen from "./HomeScreen";
import OtherScreen from "./OtherScreen";
import AboutScreen from "./AboutScreen";
import SignInScreen from "./SignInScreen";
import SignOutScreen from "./SignOutScreen";
import AuthLoadingScreen from "./AuthLoadingScreen";
import SideBar from "./SideBar";

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AboutStack = createStackNavigator({ About: AboutScreen });
const AppDrawer = createDrawerNavigator(
  { Home: HomeScreen, About: AboutScreen, "Sign Out": SignOutScreen },
  {
    initialRouteName: "Home",
    contentComponent: props => <SideBar {...props} />
  }
);
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppDrawer,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);
