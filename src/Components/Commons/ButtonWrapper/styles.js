import {CUSTOM_FONT } from '../../../constants/strings';
import {colors } from '../../../constants/colors';

import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const {width,height} = Dimensions.get('window')

export const utilityStyles = StyleSheet.create({

    // ************************************ //
    buttonStyleBig:{
        height:46,
        width:width - 60,
        marginTop:10,
        marginBottom:10,
        backgroundColor:colors.redTheme,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:3,
        shadowColor:'black',
        shadowOpacity:0.29,
        shadowRadius:3,
        elevation:7,
        shadowOffset:{
            width:0,
            height:3,
        },
    },
    textStyleBigButton:{
        color:'white',
        fontSize:14,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
    },
    // ************************************ //


});