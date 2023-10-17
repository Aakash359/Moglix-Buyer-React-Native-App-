import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen, ForgotPasswordScreen,MobileNumberScreen} from '../containers';

const AuthenticationStack = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        },
    },
  
    ForgotPasswordScreen: {
        screen: ForgotPasswordScreen,
        navigationOptions: {
            header: null,
        },
    },
    MobileNumberScreen: {
        screen: MobileNumberScreen,
        navigationOptions: {
            header: null,
        },
    }
   
}, {
        initialRouteName: 'LoginScreen',
        defaultNavigationOptions: {
            headerStyle: {
                elevation: 0, 
                shadowOpacity: 0, 
                borderBottomWidth: 0, 
            },
        },
})

export default AuthenticationStack
