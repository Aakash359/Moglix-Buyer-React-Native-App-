import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Login } from '../../Components';
import { Loader } from '../../Components/Commons';
import { postUserLogin, postGoogleUserLogin } from "../../actions";
import { isUserLoggedIn, isLoginLoading, getUserStatus, getUserIDFromInitiate } from '../../reducers/user'
import { ScreenConstants, ERROR_MESSAGES } from './../../constants';
import GlobalStyle from './../../style';
import { GlobalService } from '../../utils/GlobalService.js'

var md5 = require('md5');


class LoginScreen extends Component {

    static propTypes = {
        isLoading: PropTypes.bool,
        isLoggedIn: PropTypes.bool,
        userStatus: PropTypes.string,
        userLogin: PropTypes.func,
        googleUserLogin: PropTypes.func,
    }

    static defaultProps = {
        userId: null,
        isLoggedIn: false,
        isLoading: false,
        userStatus: null,
        userLogin: () => {
        },
    }

    constructor(props) {
        super(props)
        const { userId } = this.props
        this.state = {
            userId,
            email: '',
            password: '',
            update: false,
            errorStatus2: false,
        }
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        GlobalService.AnalyticScreen('LoginScreen')
        const { navigation, isLoggedIn } = nextProps;
        let lStatus = false;
        if (navigation.state.params)
            lStatus = navigation.state.params.logout;
        if (isLoggedIn && nextProps.userStatus === 'active' && !lStatus) {
            console.log('getDerivedStateFromProps LOGIN ', isLoggedIn)

            navigation.navigate(ScreenConstants.HOME_SCREEN)
        } else {


        }
    }

    navigateToForgotPasswordScreen() {

        this.props.navigation.navigate(ScreenConstants.FORGOT_PASSWORD_SCREEN)
    }

    validateInputForm = userName => {
        const returnValue = true;
        if (!userName) returnValue = false
        return returnValue
    }

    submitLoginForm = (data) => {
        const { userLogin } = this.props;
        const { emailId, password } = data;


        const message = this.validateInput(emailId, password)
        if (message !== '') {
            Alert.alert(
                'Error',
                message,
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        } else {

            if (this.validateInputForm({ emailId })) {
                let encryptPassword = md5(password)
                const data = {
                    userName: emailId, password: encryptPassword
                }
                userLogin(data)
            }
        }
    }


    submitGoogleLogin = (idTokenValue) => {
        const { googleUserLogin } = this.props;
        const data = {
            idToken: idTokenValue,
        }
        googleUserLogin(data)
    }

    validateInput(emailId, password) {
        var message = ''
        if (emailId.length === 0) {
            message = ERROR_MESSAGES.EMPTY_EMAIL_MESSAGE
        } else if (this.validateEmail(emailId) === false) {
            message = ERROR_MESSAGES.EMPTY_EMAIL_TITLE
        } else if (password.length === 0) {
            message = ERROR_MESSAGES.EMPTY_CONFIRM_PASSWORD_MESSAGE
        }
        return message
    }

    validateEmail(email) {
        var re = /[^\s@]+@[^\s@]+\.[^\s@]+/
        return re.test(String(email).toLowerCase())
    }

    render() {
        const { isLoading } = this.props
        const { errorStatus2 } = this.state

        return (
            <View style={{
                flex: 1,
            }}>

                <Login
                    submitLoginForm={this.submitLoginForm}
                    forgotPasswordAction={() => this.navigateToForgotPasswordScreen()}
                    rememberMeAction={() => this.rememberMeAction()}
                    rememberIconName={this.state.rememberIconName}
                    googleLoginAction={this.submitGoogleLogin}
                    errorStatus={errorStatus2}
                >
                </Login>
                {(isLoading) &&
                    <View style={GlobalStyle.loaderStyle}>
                        <Loader />
                    </View>

                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    userStatus: getUserStatus(state),
    isLoggedIn: isUserLoggedIn(state),
    isLoading: isLoginLoading(state),
    userId: getUserIDFromInitiate(state),
}
);

export default connect(mapStateToProps, {
    userLogin: postUserLogin,
    googleUserLogin: postGoogleUserLogin,
})(LoginScreen)
