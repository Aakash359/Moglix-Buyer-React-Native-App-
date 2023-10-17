import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, } from 'react-native';
import PropTypes from 'prop-types';
import { MobileNumber } from '../../Components';
import { Loader } from '../../Components/Commons';
import { postUserLogin, postGoogleUserLogin } from "../../actions";
import { isUserLoggedIn, isLoginLoading, getUserStatus, getUserIDFromInitiate } from '../../reducers/user'
import { ScreenConstants, } from './../../constants';
import GlobalStyle from './../../style';

var md5 = require('md5');


class MobileNumberScreen extends Component {

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
            mobile: '',
        }
    }

    static getDerivedStateFromProps(nextProps, nextState) {

        const { navigation, isLoggedIn } = nextProps;
        let lStatus = false;
        if (navigation.state.params)
            lStatus = navigation.state.params.logout;
        if (isLoggedIn && nextProps.userStatus === 'active' && !lStatus) {

            navigation.navigate(ScreenConstants.MOBILE_SCREEN)
        } else {


        }
    }

    navigateToForgotPasswordScreen() {
        this.props.navigation.navigate(ScreenConstants.FORGOT_PASSWORD_SCREEN)
    }

    generateOTP(value) {

    }

    render() {
        const { isLoading, navigation } = this.props
        const { errorStatus2 } = this.state

        return (
            <View style={{
                flex: 1,
            }}>

                <MobileNumber
                    generateOTP={this.generateOTP}
                    errorStatus={errorStatus2}
                    navigation={navigation}
                >
                </MobileNumber>
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
})(MobileNumberScreen)
