import React, { Component } from 'react';
import {OrSeparator, SignInNowComponent} from '../../Components/Commons';
import {styles} from './style';
import PropTypes from 'prop-types';
import { TextInputWrapper, ButtonWrapper } from '../../Components/Commons';
import { ICON } from '../../constants';
import {SafeAreaView, View, Text, TouchableOpacity, ScrollView, ImageBackground, } from 'react-native';

export default class ForgotPassword extends Component {

    static propTypes = {
        resetButtonAction:PropTypes.func,
        signInButtonAction:PropTypes.func,
    }

    static defaultProps = {
    }

    constructor(props){
        super(props);
        this.state = {emailId:''};
    }

    submitAction = () =>{
        const {resetButtonAction} = this.props
        const {emailId} = this.state 
        resetButtonAction(emailId)
    }

render() {

    const {signInButtonAction} = this.props
    var year = new Date().getFullYear()

    return(
        <SafeAreaView style={styles.containerSafeArea}>
        <ImageBackground
          style={styles.backgroundImageStyle}
          source={ICON.IMG_BACKGROUND}
        >
        <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                <Text style={styles.textStyleTitle}>Forgot</Text>
                <Text style={styles.textStyleTitle}>Password?</Text>
                <View style={styles.containerSubTitle}>
                    <Text style={styles.textStyleSubtitle}>Enter your email address below and we’ll send you password reset instruction.</Text>
                </View>
                <View style={styles.redLineView}>
                </View>
                <TextInputWrapper 
                    value={this.state.emailId}
                    onChange = {emailId => this.setState({emailId})}
                    header = 'Email ID'
                    keyboardT = 'email-address'
                />

                <TouchableOpacity onPress={() => this.submitAction()}  activeOpacity={0.7}>
                <ButtonWrapper 
                    title='RESET PASSWORD'
                />
                </TouchableOpacity>
                <OrSeparator />
                <SignInNowComponent onComponentPress={signInButtonAction} />    
            </View>
            <Text style={styles.copyWriteTextStyle}>©{year} Moglix. All Rights Reserved.</Text>
        </ScrollView>
        </ImageBackground>
        </SafeAreaView>
    );
}
}
