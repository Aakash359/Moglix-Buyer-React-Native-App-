import React, { Component } from 'react';
import { ForgotPassword } from '../../Components/index';
import ResetPasswordSuccess from '../../Components/ForgotPassword/ResetPasswordSuccess';
import ResetPasswordScreen from '../../Components/ForgotPassword/ResetPassword';
import { View } from 'react-native';
import GlobalStyle from './../../style';
import { Loader } from '../../Components/Commons';
import PropTypes from 'prop-types';
import { ERROR_MESSAGES } from '../../constants';
import { postForgotPassword, postResetPassword, flagValueChangeOfForgotP } from "../../actions";
import { connect } from 'react-redux';
import { getIsLoading, getFlagForLoadComponents, getKey, getUserId } from '../../reducers/forgotpassword';
import { Alert } from 'react-native';
const axios = require('axios');

var md5 = require('md5');



class ForgotPasswordScreen extends Component {

    static propTypes = {
        isLoading: PropTypes.bool,
        flagForLoadComponents: PropTypes.string,
        passwordKey: PropTypes.string,
        userId: PropTypes.string,
        forgotPasswordFunc: PropTypes.func,
        resetPasswordFunc: PropTypes.func,
        flagValueChange: PropTypes.func,
    }

    static defaultProps = {
        userId: null,
        flagForLoadComponents: '1',
        passwordKey: '',
        userId: '',
        forgotPasswordFunc: () => {
        },
        resetPasswordFunc: () => {
        },
        flagValueChange: () => {
        },
    }

    constructor(props) {
        super(props);
        this.state = { emailId: '', flagForLoadComponents: 1, key: '', userId: '', isLoading: false }
    }

    signInButtonAction() {
        console.log('FFFFFFFFFFFFFFFF')
        const { flagValueChange } = this.props
        flagValueChange()
        this.props.navigation.goBack()
    }

    resetPasswordAction = emailId => {

        this.setState({ emailId: emailId })

        const message = this.checkFormData(emailId)
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
            this.setState({ isLoading: true })
            this.callForgotPasswordAPI(emailId)
        }
    }

    callForgotPasswordAPI = (emailId) => {

        const data = {
            email: emailId, resetUrl: 'https://buyersqa.moglix.com/#/reset', application: '1',
        }
        const { forgotPasswordFunc } = this.props
        forgotPasswordFunc(data)
    }

    checkFormData(emailId) {
        var message = ''
        if (emailId.length === 0) {
            message = ERROR_MESSAGES.EMPTY_EMAIL_MESSAGE
        } else if (this.validateEmail(emailId) === false) {
            message = ERROR_MESSAGES.EMPTY_EMAIL_TITLE
        }
        return message
    }

    validateEmail(email) {
        var re = /[^\s@]+@[^\s@]+\.[^\s@]+/
        return re.test(String(email).toLowerCase())
    }


    confirmPasswordAction = (password, confirmPassword) => {
        const message = this.validateResetPasswordFormData(password, confirmPassword)
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
            this.setState({ isLoading: true })
            this.callResetPasswordAPI(password)
        }
    }

    callResetPasswordAPI(password) {
        const { passwordKey, userId, resetPasswordFunc } = this.props
        let encryptPassword = md5(password)
        const data = {
            key: passwordKey, userId: userId, password: encryptPassword,
        }
        resetPasswordFunc(data)
    }

    validateResetPasswordFormData(password, confirmPassword) {
        var message = ''
        if (password.length === 0) {
            message = ERROR_MESSAGES.EMPTY_PASSWORD_MESSAGE
        } else if (confirmPassword.length === 0) {
            message = ERROR_MESSAGES.EMPTY_CONFIRM_PASSWORD_MESSAGE
        } else if (password != confirmPassword) {
            message = ERROR_MESSAGES.PROFILE_PASSWORD_CONFIRMATION_PASSWORD_MISMATCH_MESSAGE
        }
        return message
    }

    render() {
        const { flagForLoadComponents, isLoading } = this.props

        if (flagForLoadComponents == '2') {
            return (
                <View style={{
                    flex: 1,
                }}>
                    <ResetPasswordScreen
                        confirmButtonAction={this.confirmPasswordAction}
                        signInResetButtonAction={() => this.signInButtonAction()}
                    />
                    {(isLoading) &&
                        <View style={GlobalStyle.loaderStyle}>
                            <Loader />
                        </View>
                    }
                </View>
            )
        } else if (flagForLoadComponents == '3') {
            return (
                <ResetPasswordSuccess
                    signInButtonAction={() => this.signInButtonAction()}
                />
            )
        } else {
            return (
                <View style={{
                    flex: 1,
                }}>
                    <ForgotPassword
                        resetButtonAction={this.resetPasswordAction}
                        signInButtonAction={() => this.signInButtonAction()}
                    />
                    {(isLoading) &&
                        <View style={GlobalStyle.loaderStyle}>
                            <Loader />
                        </View>
                    }
                </View>
            )
        }
    }
}

const mapStateToProps = state => ({
    isLoading: getIsLoading(state),
    flagForLoadComponents: getFlagForLoadComponents(state),
    passwordKey: getKey(state),
    userId: getUserId(state),
}
);

export default connect(mapStateToProps, {
    forgotPasswordFunc: postForgotPassword,
    resetPasswordFunc: postResetPassword,
    flagValueChange: flagValueChangeOfForgotP,
})(ForgotPasswordScreen)