/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from "react";
import DatabaseManager from "./Moglix/Storage/storage";
import {
  LoginScreen,
  ForgotPasswordScreen,
  HomeScreen,
} from "./Moglix/containers";

import { StyleSheet, View } from "react-native";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getLoggedInUserId();
  }

  getLoggedInUserId = async () => {
    const userToken = await DatabaseManager.getUserId();
    this.props.navigation.navigate(
      userToken != "none" ? "Application" : "Auth"
    );
  };

  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerBlank: {
    flex: 1,
  },
});

/* ####################### */
/*   App Navigator   */
/* ####################### */

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: App,
      Application: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "AuthLoading",
    }
  )
);
