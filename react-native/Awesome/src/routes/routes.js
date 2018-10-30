import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";

import HomeScreen from "./HomeScreen";
import OtherScreen from "./OtherScreen";
import SignInScreen from "./SignInScreen";
import AuthLoadingScreen from "./AuthLoadingScreen";

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AppDrawer = createDrawerNavigator({ AppStack });
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
