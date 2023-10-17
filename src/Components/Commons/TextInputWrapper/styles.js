import {CUSTOM_FONT } from '../../../constants/strings';
import {colors } from '../../../constants/colors';

import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const {width,height} = Dimensions.get('window')

export const utilityStyles = StyleSheet.create({

    // ************************************ //
    // Text input style...
    inputViewContainer:{
        width:width - 60,
        height:55,
        marginTop:15,
        marginBottom:15,
    },
    inputTextHeaderContainerStyle:{
        height:15,
        marginTop:-8,
        marginLeft:12,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        alignSelf: 'flex-start',
    },
    inputTextHeaderStyle:{
        color:colors.buttonDarkGray,
        fontSize:12,
        marginLeft:5,
        marginRight:5,
        fontFamily:CUSTOM_FONT.HEEBO_MEDIUM,
    },
    inputTextStyle:{
        color:colors.buttonDarkGray,
        fontSize:14,
        marginLeft:8,
        marginRight:8,
        height:38,
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,

    },
    textInputContainer:{
        width:width - 60,
        height:46,
        borderRadius:4,
        borderColor:'#A5A5A5',
        borderWidth:1,
        marginTop:8,
        paddingBottom: 8,
    },
    selectedTextInputContainer:{
        width:width - 60,
        height:46,
        borderRadius:4,
        borderColor:'#454F63',
        borderWidth:1,
        marginTop:8,
        paddingBottom: 8,
    },
    textInputHighlightedContainer:{
        width:width - 60,
        height:46,
        borderRadius:4,
        borderColor:'#A5A5A5',
        borderWidth:1,
        marginTop:8,
        paddingBottom: 8,
    },
    // ************************************ //
    
    labelInput: {
        color:'#A5A5A5',
        fontSize:14,
        backgroundColor:'white',
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,
        marginLeft:8,
    },
    selectedLabelInput: {
        color:'#454F63',
        fontSize:14,
        backgroundColor:'white',
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,
        marginLeft:8,
    },
    formInput: {
      marginTop:-17,
    },
    input: {
      borderWidth: 0,
      color:colors.buttonDarkGray,
      fontSize:14,
      fontFamily:CUSTOM_FONT.HEEBO_REGULAR,
    },
    passIcon: {
      position: 'absolute', 
      right: 10, 
      top: 12, 
      zIndex: 100
    },
});