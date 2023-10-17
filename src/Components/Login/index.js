import React, { Component } from 'react';
import { ICON, ERROR_MESSAGES } from '../../constants';
import { TextInputWrapper, ButtonWrapper } from '../Commons';
import { styles } from './style';
import PropTypes from 'prop-types';
import DatabaseManager from './../../Storage/storage';

import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

const axios = require('axios');

export default class Login extends Component {
  static propTypes = {
    submitLoginForm: PropTypes.func,
    googleLoginAction: PropTypes.func,
    forgotPasswordAction: PropTypes.func,
    rememberMeAction: PropTypes.func,
    rememberIconName: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    errorStatus: PropTypes.bool,
  }


  constructor(props) {
    super(props);

    this.state = {
      emailId: '',
      password: '',
      text: '',
      userInfo: null,
      inputType: true,
      gettingLoginStatus: true,
      rememberIconName: '',
      isSecure: true
    };

    this.getRememberMeStatus()
  }

  getRememberMeStatus = async () => {
    const status = await DatabaseManager.getRememberAction();

    (async () => {
      console.log('status :', status)

      const email = await DatabaseManager.getEmailId()
      const password = await DatabaseManager.getPassword()

      if (status == '0') {
        DatabaseManager.saveEmailId('')
        DatabaseManager.savePassword('')
        this.setState({ rememberIconName: '0' })
      } else {
        this.setState({ rememberIconName: '1', emailId: email, password: password })
      }
    })();
  }

  rememberMeAction = () => {
    if (this.state.rememberIconName == '0') {
      DatabaseManager.saveRememberAction('1')
      this.setState({ rememberIconName: '1' })
    } else {
      DatabaseManager.saveRememberAction('0')
      this.setState({ rememberIconName: '0' })
    }
  }
  static defaultProps = {

    submitLoginForm: () => {
      console.log('Component:: Login:: local submitLoginForm is Active');
    },
    forgotPasswordAction: () => {
      console.log('-----------------forgotPasswordAction')
    },
    rememberMeAction: () => {
      console.log('-----------------rememberMeAction')
    },
    googleLoginAction: () => {
      console.log('-----------------rememberMeAction')
    },
    email: '',
    password: '',
    rememberIconName: ''
  }


  rememberUserData = () => {
    const { emailId, password } = this.state
    if (this.state.rememberIconName == '1') {
      DatabaseManager.saveEmailId(emailId)
      DatabaseManager.savePassword(password)
    }
  }
  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '45926344386-8sild1t0ijpu2lq08n1u9b0ghm8eitoh.apps.googleusercontent.com',
    });

  }



  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');

      this._getCurrentUserInfo();
    } else {

      console.log('Please Login');
    }
    this.setState({ gettingLoginStatus: false });
  };

  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  _signIn = async () => {
    try {
      this._signOut()
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo: userInfo });
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  _signOut = async () => {

    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null });
    } catch (error) {
      console.error(error);
    }
  };

  _signOut = async () => {

    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null });
    } catch (error) {
      console.error(error);
    }
  };



  userLogin = () => {
    global.activeOrders = 0
    DatabaseManager.saveFilterData(JSON.stringify(['', '', '', '']))
    DatabaseManager.saveDashbaordFilterData(JSON.stringify(['', '', '', '']))

    this.rememberUserData()

    const { submitLoginForm } = this.props
    const { emailId, password } = this.state
    submitLoginForm({ emailId, password })
  }

  onPress = () => {
    this.setState({ isSecure: !this.state.isSecure })
  }

  render() {

    const { forgotPasswordAction, errorStatus, } = this.props
    const { emailId, password, rememberIconName } = this.state
    return (

      <SafeAreaView style={styles.containerSafeArea}>
        <ImageBackground
          style={styles.backgroundImageStyle}
          source={ICON.IMG_BACKGROUND}
        >
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
              <View style={styles.logoStyle}>
                <Image
                  style={styles.logoImageStyle}
                  source={ICON.IC_LOGIN_LOGO}
                />
              </View>

              <View style={styles.containerSubTitle}>
                <Text style={styles.textStyleSubtitle}>One-Stop-Solution for all your Procurement needs.</Text>
              </View>
              <View style={styles.redLineView}>
              </View>

              <TextInputWrapper
                value={emailId}
                onChange={(emailId) => this.setState({ emailId })}
                header='Email ID'
                keyboardT='email-address'
                errorFlag={errorStatus}
              />

              <TextInputWrapper
                value={password}
                onChange={(password) => this.setState({ password })}
                header='Password'
                isSecureTextEntry={this.state.isSecure}
                errorFlag={errorStatus}
                onPress={this.onPress}
                inputType={'password'}
              />




              <View style={styles.rememberForgotContainerStyle}>
                <TouchableOpacity onPress={() => this.rememberMeAction()}>
                  <View style={styles.rememberContainerStyle}>
                    <View style={styles.rememberCheckbox}>
                      <Image
                        style={styles.image}
                        source={rememberIconName == '1' ? ICON.IC_CHECK_BOX : ''}
                      />
                    </View>
                    <Text style={styles.rememberTextStyle}>Remember Me</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={forgotPasswordAction}>
                  <View style={styles.buttonForgetStyle}>
                    <Text style={styles.textForgetStyle}>Forgot Password?</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => this.userLogin()} activeOpacity={0.7}>
                <ButtonWrapper
                  title='SIGN IN'
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.copyWriteTextStyle}>{ERROR_MESSAGES.COPY_WRITE_TEXT}</Text>
          </ScrollView>

        </ImageBackground>
      </SafeAreaView>
    );
  }
}
