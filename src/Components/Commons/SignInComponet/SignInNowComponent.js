import React from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Dimensions} from 'react-native';
import {colors} from '../../../constants';
import {CUSTOM_FONT } from '../../../constants/strings';
const {width} = Dimensions.get('window')

export default function SignInNowComponent(props){
    return(
        <View style={styles.signInNowContainer}>
            <Text style={styles.signInText}>Already have an Business Account?</Text>
            <TouchableOpacity onPress={props.onComponentPress}>
                <View style={styles.signInButtonContainer}>
                    <Text style={styles.signInButtonText}> SIGN IN NOW</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    signInNowContainer:{
        width:width - 60,
        height: 40,
        backgroundColor:'white',
        marginTop:10,
        marginBottom:10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    signInText:{
        color:colors.DEFAULT_BUTTON_DARK_GRAY,
        fontSize:12,
        backgroundColor:'white',
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,
    },
    signInButtonContainer:{
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
    },
    signInButtonText:{
        color:colors.DEFAULT_RED_COLOR,
        fontSize:12,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        backgroundColor:'white',
    },
});
