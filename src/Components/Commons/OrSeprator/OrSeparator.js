import React from 'react';
import {View,StyleSheet,Text,Dimensions} from 'react-native';
import {colors} from '../../../constants';
import {CUSTOM_FONT } from '../../../constants/strings';
const {width} = Dimensions.get('window')


export default function OrSeparator(){
    return(
        <View style={styles.separatorLineContainer}>
            <View style={styles.separatorLine}>
            </View>
            <View style={styles.separatorLineTextContainer}>
                <Text style={styles.separatorLineText}>OR</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    separatorLineContainer:{
        width:width - 60,
        height: 14,
        backgroundColor:'white',
        marginTop:10,
        marginBottom:10,
        alignItems:'center',
    },
    separatorLine:{
        width:width - 60,
        height: 1,
        backgroundColor:colors.DEFAULT_SEPARATOR_COLOR,
        marginTop:7,
    },
    separatorLineTextContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        height:14,
        width:28,
        marginTop:-7,
    },
    separatorLineText:{
        color:colors.DEFAULT_BUTTON_DARK_GRAY,
        fontSize:12,
        marginLeft:5,
        marginRight:5,
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,
    },
});