import {colors } from '../../constants';
import {CUSTOM_FONT } from '../../constants/strings';

import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window')

export const styles = StyleSheet.create({
    containerSafeArea:{
        flex:1,
        //backgroundColor:'transparent',
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
        marginLeft:30,
        marginRight:30,
        marginTop:(Platform.OS === 'ios' ? 70 : 30 ),
    },
    logoStyle:{
        width:width*0.3,
        height:width*0.2,
    },
    logoImageStyle:{
        width:width*0.45,
        height:width*0.2,
        resizeMode:'contain',
    },
    textStyleTitle:{
        color:colors.DEFAULT_TEXT_BLACK,
        fontWeight:'bold',
        fontSize:26,
    },
    containerSubTitle:{
        flexDirection:'column',
        // marginTop:20,
        // marginBottom:36,
        marginTop:width*0.03,
        marginBottom:width*0.08,
        opacity:0.6,
    },
    textStyleSubtitle:{
        color:colors.DEFAULT_TEXT_LIGHT_GRAY,
        fontSize:16,
        fontFamily:CUSTOM_FONT.ROBOTO_REGULAR,
        marginRight:60,
    },
    redLineView:{
        width:76,
        height:5,
        //marginBottom:20,
        marginBottom:width*0.03,
        backgroundColor:colors.DEFAULT_RED_COLOR,
    },
    buttonForgetStyle:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
    },
    textForgetStyle:{
        color:'#278BED',
        fontSize:14,
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,
    },
    rememberTextStyle:{
        fontSize:12,
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,
    },
    rememberContainerStyle:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    rememberForgotContainerStyle:{
        width:width - 60,
        height:40,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:-10,
    },
    rememberCheckbox:{
        width:12,
        height:12,
        backgroundColor:'white',
        borderColor:'#6A6A6A',
        borderWidth:1,
        marginRight:8,
    },
    image:{
        width:12,
        height:12,
        resizeMode:'contain',
    },
    buttonGoogleSigning:{
        height:46,
        width:width - 60,
        marginTop:10,
        marginBottom:10,
        alignItems:'center',
        //justifyContent:'center',
        borderRadius:3,
        shadowColor:'black',
        shadowOpacity:0.29,
        shadowRadius:3,
        elevation:7,
        shadowOffset:{
            width:0,
            height:3,
        },
        backgroundColor: 'white',
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    googleIconViewStyle:{
        width:60,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
    },
    googleTextViewStyle:{
        flex:1,
        backgroundColor:'transparent',
        //alignItems:'center',
        justifyContent:'center',
        marginLeft: -60,
    },
    googleLoginButtonTexStyle:{
        color:'#454F63',
        fontSize:14,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        marginLeft:15,
        textAlign: 'center',
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