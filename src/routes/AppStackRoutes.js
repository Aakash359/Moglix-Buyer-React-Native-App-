import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {
    HomeScreen,OrderDetalsScreen,TrackItemsScreen,InvoiceDetailsScreen,
    SearchScreen, CalendarScreen, Sidebar,TrackItemStatusScreen, DownloadFileScreen
} from '../containers';

const AppStack = createStackNavigator({
   
    HomeScreen: {
        screen: HomeScreen, navigationOptions:{
            drawerLabel: () => null,
            header: null,
        }
    },
    OrderDetalsScreen: {
        screen: OrderDetalsScreen, navigationOptions:{
            drawerLabel: () => null,
            header: null,
        }
    },
    InvoiceDetailsScreen: {
        screen: InvoiceDetailsScreen, navigationOptions:{
            drawerLabel: () => null,
            header: null,
        }
    },
    TrackItemsScreen: {
        screen: TrackItemsScreen, navigationOptions:{
            drawerLabel: () => null,
            header: null,
        }
    },
    SearchScreen: {
        screen: SearchScreen, navigationOptions:{
            header: null,
        }
    },
    CalendarScreen: {
        screen: CalendarScreen, navigationOptions:{
            header: null,
        }
    },
    TrackItemStatusScreen: {
        screen: TrackItemStatusScreen, navigationOptions:{
            drawerLabel: () => null,
            header: null,
        }
    },
    DownloadFileScreen: {
        screen: DownloadFileScreen, navigationOptions:{
            drawerLabel: () => null,
            header: null,
        }
    },
   }, {
        headerMode: 'screen',
        initialRouteName: 'HomeScreen',
        navigationOptions: {
            header: null,
        },
    });

    AppStack.navigationOptions = ({ navigation }) => {
        let name = (navigation.state.index !== undefined ? navigation.state.routes[navigation.state.index] : navigation.state.routeName)
        let drawerLockMode = 'locked-closed'
        if (name.routeName == 'HomeScreen' || name.routeName == 'OrderListScreen' || name == 'SearchScreen') {
            drawerLockMode = 'unlocked'
        }
        return {
            drawerLockMode,
        };
    }

const DrawerStack = createDrawerNavigator({
    AppStack,
    HomeScreen: { screen: HomeScreen },
    
  },
    {
        initialRouteName: 'AppStack',
        contentOptions:
        {
            activeTintColor: '#e91e63'
        }
        ,
        headerMode: 'none',
        navigationOptions:
        {
            header: null,
        },
        contentComponent: props => <Sidebar {...props} />,
    },
)

export default DrawerStack
