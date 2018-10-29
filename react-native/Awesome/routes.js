import React from 'react';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import HomeScreen from "./routes/HomeScreen"
import OtherScreen from "./routes/OtherScreen"
import SignInScreen from "./routes/SignInScreen"
import AuthLoadingScreen from "./routes/AuthLoadingScreen"

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AppDrawer = createDrawerNavigator({AppStack})
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppDrawer,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
