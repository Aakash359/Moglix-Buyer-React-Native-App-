import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import {
  OrderListScreen,
  OrderDetalsScreen,
  InvoiceDetailsScreen,
  TrackItemsScreen,
  SearchScreen,
  CalendarScreen,
  FilterDrawer,
  TrackItemStatusScreen,
  DownloadFileScreen,
} from "../containers";

const ActiveOrderStack = createStackNavigator(
  {
    OrderListScreen: {
      screen: OrderListScreen,
      navigationOptions: {
        drawerLabel: () => null,
        header: null,
      },
    },
    OrderDetalsScreen: {
      screen: OrderDetalsScreen,
      navigationOptions: {
        drawerLabel: () => null,
        header: null,
      },
    },
    InvoiceDetailsScreen: {
      screen: InvoiceDetailsScreen,
      navigationOptions: {
        drawerLabel: () => null,
        header: null,
      },
    },
    TrackItemsScreen: {
      screen: TrackItemsScreen,
      navigationOptions: {
        drawerLabel: () => null,
        header: null,
      },
    },
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: {
        drawerLabel: () => null,
        header: null,
      },
    },
    CalendarScreen: {
      screen: CalendarScreen,
      navigationOptions: {
        header: null,
      },
    },
    TrackItemStatusScreen: {
      screen: TrackItemStatusScreen,
      navigationOptions: {
        drawerLabel: () => null,
        header: null,
      },
    },
    DownloadFileScreen: {
      screen: DownloadFileScreen,
      navigationOptions: {
        drawerLabel: () => null,
        header: null,
      },
    },
  },
  {
    headerMode: "screen",
    initialRouteName: "OrderListScreen",
    navigationOptions: {
      header: null,
    },
  }
);

ActiveOrderStack.navigationOptions = ({ navigation }) => {
  let name =
    navigation.state.index !== undefined
      ? navigation.state.routes[navigation.state.index]
      : navigation.state.routeName;
  let drawerLockMode = "locked-closed";
  if (name.routeName == "OrderListScreen" || name.routeName == "SearchScreen") {
    drawerLockMode = "unlocked";
  }
  return {
    drawerLockMode,
  };
};

const ActiveOrderDrawerStack = createDrawerNavigator(
  {
    ActiveOrderStack,
    OrderListScreen: { screen: OrderListScreen },
    SearchScreen: { screen: SearchScreen },
  },
  {
    initialRouteName: "ActiveOrderStack",
    contentOptions: {
      activeTintColor: "#e91e63",
    },
    headerMode: "none",
    navigationOptions: {
      header: null,
    },
    drawerPosition: "right",
    contentComponent: (props) => <FilterDrawer {...props} />,
  }
);

//export default AppStack
export default ActiveOrderDrawerStack;
