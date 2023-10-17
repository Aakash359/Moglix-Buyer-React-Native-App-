import React, { Component } from 'react';
import { ICON, ERROR_MESSAGES,ScreenConstants } from '../../constants';
import { TextInputWrapper, ButtonWrapper } from '../Commons';
import { styles } from './style';
import PropTypes from 'prop-types';
import DatabaseManager from './../../Storage/storage';
import analytics from '@react-native-firebase/analytics';
import { API_URLS, AppConfig } from '../../constants';
import Toast from 'react-native-simple-toast';

import {
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    ImageBackground,
} from 'react-native';


const axios = require('axios');

export default class MobileNumber extends Component {
  static propTypes = {
    submitLoginForm: PropTypes.func,
    googleLoginAction: PropTypes.func,
    forgotPasswordAction: PropTypes.func,
    rememberMeAction: PropTypes.func,
    rememberIconName: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    errorStatus: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      mobile: "",
      showEnterOtp:true,
      otp:'',
      time: {}, 
      seconds: 30,
      serverOTP:null,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  static defaultProps = {
    submitLoginForm: () => {
      console.log("Component:: Login:: local submitLoginForm is Active");
    },
    email: "",
    password: "",
    rememberIconName: "",
  };

  componentDidMount() {
    this.startTimer()
    this.generateOTP()
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });  
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  resendOTP(){
    this.timer = 0
    this.setState({seconds:30},()=>{    this.startTimer()    })
    this.generateOTP()
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }
   
  onChange = (otp) => {
    this.setState({ 
      otp
    }, 
    () => {if(otp.length==4){
      this.matchOtp()
    }},
   )
  }

  enterOTP() {
    const {otp,time} = this.state
    const sec = time.s <10? "0"+time.s:time.s
    return (
      <View>
        <TextInputWrapper
          maxLength={4}
          value={otp}
          onChange={this.onChange}
          header="Enter OTP"
          keyboardT="numeric"
        />
        <View style={{flexDirection:'row', width:'100%',justifyContent:'space-between'}}>
        <TouchableOpacity
          onPress={() => this.resendOTP()}
          activeOpacity={0.7}
          disabled={this.state.seconds>0?true:false}
        >
          <Text style={{textAlign:'center',color:this.state.seconds>0?'gray':'#3a72c0'}}>Resend OTP</Text>
        </TouchableOpacity>
        <Text style={{textAlign:'center'}}>0{time.m}:{sec}</Text>
        </View>
      </View>
    );
  }

      generateOTP = async () => {   
      const emailId = await DatabaseManager.getEmailId();
      const token = await DatabaseManager.getUserToken()
      const userId = await DatabaseManager.getUserId()


      var axios = require("axios");
      var data = JSON.stringify({
        message: "",
        id:userId
      });
   
      const headers = { 
       'application': AppConfig.APP_ID,
       'idBranch':1,          // 8855,
       'idCompany':1,        //,
       'idUser': userId,
       'token': token,
       'Content-Type': 'application/json'
     }
      var config = {
        method: "post",
        url: 'https://buyerintqa.moglilabs.com/sms/generateAndSendOtp',
        headers: headers,
        data: data,
      };
   
      axios(config)
        .then(response => {
          if (response.data.success){
            console.log("response=="+JSON.stringify(response))
            console.log("response=="+JSON.stringify(response.data.data[0].message))
            var otp = response.data.data[0].message
            var intValue = parseInt(otp.match(/[0-9]+/)[0], 10);
            this.setState({serverOTP:intValue})
            Toast.show("Please enter OTP sent to your number.")
          }
     
        })
        .catch(function (error) {
          alert(error);
        });
    }
  
  matchOtp = async() => {
    const userEmail = await DatabaseManager.getEmailId();
    if (this.state.otp == this.state.serverOTP){
      await DatabaseManager.setOTPVerified('true')
      await analytics().setUserProperty('email',userEmail)
      this.props.navigation.navigate(ScreenConstants.HOME_SCREEN)
    }
    else{
      Toast.show("Please enter correct OTP.")
    }
  }
  
  render() {
    const { forgotPasswordAction, errorStatus } = this.props;
    const { mobile } = this.state;
    return (
      <SafeAreaView style={styles.containerSafeArea}>
        <ImageBackground
          style={styles.backgroundImageStyle}
          source={ICON.IMG_BACKGROUND}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={styles.container}>
              <View style={styles.logoStyle}>
                <Image
                  style={styles.logoImageStyle}
                  source={ICON.IC_LOGIN_LOGO}
                />
              </View>

              <View style={styles.containerSubTitle}>
                <Text style={styles.textStyleSubtitle}>
                  One-Stop-Solution for all your Procurement needs.
                </Text>
              </View>
              <View style={styles.redLineView}></View>
              {this.state.showEnterOtp?this.enterOTP():null}
             <TouchableOpacity
                onPress={this.matchOtp}
                activeOpacity={0.7}
              >
                <ButtonWrapper title={!this.state.showEnterOtp?"GENERATE OTP":"LOGIN"} />
              </TouchableOpacity>
            </View>
            <Text style={styles.copyWriteTextStyle}>
              {ERROR_MESSAGES.COPY_WRITE_TEXT}
            </Text>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

