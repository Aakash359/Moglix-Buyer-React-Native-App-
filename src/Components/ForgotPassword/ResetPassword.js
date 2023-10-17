import React from 'react';
import {colors} from '../../constants';
import {OrSeparator, SignInNowComponent} from '../../Components/Commons';
import PropTypes from 'prop-types';
import { TextInputWrapper,ButtonWrapper } from '../../Components/Commons';
import {CUSTOM_FONT } from '../../constants/strings';
import { ICON, ERROR_MESSAGES } from '../../constants';

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ImageBackground, 
} from 'react-native';


class ResetPassword extends React.Component {

    static propTypes = {
        confirmButtonAction: PropTypes.func,
        signInResetButtonAction: PropTypes.func,
    }

    static defaultProps = {
        confirmButtonAction: () => {
            console.log('-----------------confirmButtonAction')
        },
        signInResetButtonAction: () => {
            console.log('-----------------signInResetButtonAction')
        }
    }

    constructor(props){
        super(props);
        this.state = {password:'',confirmPassword:''};
    }

    confirmAction = () =>{
         const {confirmButtonAction} = this.props
         const {password,confirmPassword} = this.state 
         confirmButtonAction(password,confirmPassword)
    }

    render() {

        const {signInResetButtonAction} = this.props

        return(
            <SafeAreaView style={styles.containerSafeArea}>
            <ImageBackground
            style={styles.backgroundImageStyle}
            source={ICON.IMG_BACKGROUND}
            >
            <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                    <Text style={styles.textStyleTitle}>Reset</Text>
                    <Text style={styles.textStyleTitle}>Password</Text>
                    <View style={styles.containerSubTitle}>
                        <Text style={styles.textStyleSubtitle}>Set password for Business Moglix</Text>
                    </View>
                    <View style={styles.redLineView}>
                    </View>
                    <TextInputWrapper 
                        value={this.state.password}
                        onChange = {(password) => this.setState({password})}
                        header = 'Password'
                        isSecureTextEntry = {true}
                    />
                    
                    <TextInputWrapper 
                        value={this.state.confirmPassword}
                        onChange = {(confirmPassword) => this.setState({confirmPassword})}
                        header = 'Confirm Password'
                        isSecureTextEntry = {true}
                    />

                    <TouchableOpacity onPress={() => this.confirmAction()}  activeOpacity={0.7}>
                    <ButtonWrapper 
                        title='CONFIRM'
                    />
                    
                    </TouchableOpacity>
                    <OrSeparator />
                    <SignInNowComponent onComponentPress={signInResetButtonAction} />       
                </View>
        <Text style={styles.copyWriteTextStyle}>{ERROR_MESSAGES.COPY_WRITE_TEXT}</Text>
            </ScrollView>
            </ImageBackground>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    containerSafeArea:{
        flex:1,
    },
    backgroundImageStyle:{
        flex:1,
        resizeMode:'contain',
        marginTop:(Platform.OS === 'ios' ? -44 : 0 ),
        marginBottom:(Platform.OS === 'ios' ? -44 : 0 ),
    },
    container:{
        flex:1,
        flexDirection:'column',
        //backgroundColor:'green',
        alignItems:'flex-start',
        paddingLeft:30,
        paddingRight:30,
        paddingTop:56,
    },
    textStyleTitle:{
        color:colors.DEFAULT_TEXT_BLACK,
        fontFamily:CUSTOM_FONT.ROBOTO_BOLD,
        fontSize:26,
    },
    containerSubTitle:{
        flexDirection:'column',
        marginTop:20,
        marginBottom:36,
        opacity:0.6,
    },
    textStyleSubtitle:{
        color:colors.DEFAULT_TEXT_LIGHT_GRAY,
        fontSize:16,
        fontFamily:CUSTOM_FONT.ROBOTO_REGULAR,
    },
    redLineView:{
        width:76,
        height:5,
        marginBottom:20,
        backgroundColor:colors.DEFAULT_RED_COLOR,
    },
    copyWriteTextStyle:{
        color: '#1919194D', 
        textAlign: 'center',
        fontSize: 10,
        fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
        marginBottom: 20,
    },
});

export default ResetPassword;