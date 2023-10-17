import {colors} from '../../constants';
import {CUSTOM_FONT } from '../../constants/strings';

import {
    StyleSheet, Platform,
} from 'react-native';

export const styles = StyleSheet.create({
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
        marginBottom:20,
        backgroundColor:colors.DEFAULT_RED_COLOR,
    },
    copyWriteTextStyle:{
        marginBottom: 20, 
        color: '#1919194D', 
        textAlign: 'center',
        fontSize: 10,
        fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
        height: (Platform.OS === 'ios' ? 50 : 20 ),
    },
});