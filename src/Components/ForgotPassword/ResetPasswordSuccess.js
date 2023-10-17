import React from 'react';
import {colors} from '../../constants';
import PropTypes from 'prop-types';
import { ButtonWrapper } from '../../Components/Commons';
import {CUSTOM_FONT } from '../../constants/strings';
import { ICON, ERROR_MESSAGES } from '../../constants';

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    SafeAreaView,
    ImageBackground, 
} from 'react-native';

class ResetPasswordSuccess extends React.Component {

    static propTypes = {
        signInButtonAction: PropTypes.func,
    }

    static defaultProps = {
        signInButtonAction: () => {
            console.log('-----------------signInButtonAction')
        }
    }


    render() {

        const {signInButtonAction} = this.props

        return(
            <SafeAreaView style={styles.containerSafeArea}>
            <ImageBackground
          style={styles.backgroundImageStyle}
          source={ICON.IMG_BACKGROUND}
        >
                <View style={styles.container}>
                    <Text style={styles.textStyleTitle}>Password</Text>
                    <Text style={styles.textStyleTitle}>Reset Successfully</Text>
                    <View style={styles.containerSubTitle}>
                        <Text style={styles.textStyleSubtitle}>Go back and try Sign In again</Text>
                        <Text style={styles.textStyleSubtitle}>with your new password</Text>
                    </View>
                    <View style={styles.redLineView}>
                    </View>

                <TouchableOpacity onPress={signInButtonAction}  activeOpacity={0.7}>
                <ButtonWrapper 
                        title='GO TO SIGN IN'
                    />
                </TouchableOpacity>
                </View>
                <Text style={styles.copyWriteTextStyle}>{ERROR_MESSAGES.COPY_WRITE_TEXT}</Text>
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
        marginBottom:50,
        backgroundColor:colors.DEFAULT_RED_COLOR,
    },
    copyWriteTextStyle:{
        marginBottom: 20, 
        color: '#1919194D', 
        textAlign: 'center',
        fontSize: 10,
        fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
    },
});

export default ResetPasswordSuccess;