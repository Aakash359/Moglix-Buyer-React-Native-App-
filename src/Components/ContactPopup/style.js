import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import {CUSTOM_FONT } from '../../constants/strings';

const { width,height } = Dimensions.get('window')

export const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#0000004D',
        justifyContent: 'flex-end',
    },
    popUpcontainer: {
        height: 150,
        backgroundColor: 'white',
        marginBottom: 40,
        marginLeft: 25,
        marginRight:25,
        borderRadius: 12,
    },
    contactButtonStyle: {
        height: 52,
        width: 52,
        backgroundColor: '#D9232D',
        marginRight: 30,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        shadowColor: '#FFC0CB',
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation:12,
        shadowOffset: {
            width: 0,
            height: 6,
        }
    },
    contactImage: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },

    titleView:{
        marginLeft: 20,
        marginTop: 20,
        height: 24,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    titleText:{
        fontSize: 16,
        fontFamily:CUSTOM_FONT.HEEBO_MEDIUM,

    },
    crosImageStyle:{
        height:15,
        width:15,
        marginRight: 20,
        resizeMode: 'contain'
    },
    subTitleText:{
        fontSize: 14,
        opacity: 0.5,
        marginLeft: 20,
        marginBottom: -10,
        color: '#454F63',
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,

    },
    subTitleText2:{
        fontSize: 14,
        opacity: 0.5,
        marginLeft: 20,
        marginBottom: -10,
        marginTop: 20,
        color: '#454F63',
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,

    },
    callView:{
        margin: 20,
        marginLeft:30,
        height: 24,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    callText:{
        fontSize: 14,
        marginLeft: 0,
        color: '#D9232D',
        fontFamily:CUSTOM_FONT.HEEBO_MEDIUM,
        textAlignVertical: 'center',
        marginTop: -3,
    },
    emailContainerView: {
        flex:1,
        backgroundColor: '#0000004D',
        justifyContent: 'center',
    },
    emailBodyView: {
        borderRadius: 10,
        backgroundColor: 'white',
        marginLeft: 25,
        marginRight: 25,
    },
    haveAQueryText: {
        fontSize: 16,
        marginLeft: 25,
        marginTop: 25,
        fontFamily:CUSTOM_FONT.HEEBO_MEDIUM,

    },
    inputViewContainer:{
        height:55,
        marginTop:width*0.06,
        marginBottom:width*0.04,
        marginLeft: 25,
    },
    entryViewContainer:{
        width:width - 100,
        height:150,
        marginTop:width*0.06,
        marginBottom:width*0.04,
        marginLeft: 25,
    },
    textInputContainer:{
        width:width - 100,
        height:46,
        borderRadius:4,
        borderColor:'darkgray',
        borderWidth:1,
        marginTop:8,
        paddingBottom: 8,
    },
    textEntryContainer:{
        width:width - 100,
        height:150,
        borderRadius:4,
        borderColor:'darkgray',
        borderWidth:1,
        marginTop:8,
        paddingBottom: 8,
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
    inputTextStyle:{
        color:'black',
        fontSize:14,
        marginLeft:8,
        marginRight:8,
        height:45,
        flex:1,
        textAlignVertical: 'top',
        padding: 5,
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,

    },
    inputTextHeaderStyle:{
        color:'darkgray',
        fontSize:12,
        marginLeft:5,
        marginRight:5,
        fontFamily:CUSTOM_FONT.HEEBO_MEDIUM,

    },
    cancelAndSubmitButtonView:{
        flexDirection:'row',
        justifyContent: "space-around",
        marginLeft: 25,
        marginRight: 25,
        marginTop: 30,
        marginBottom: 25,
        height: 50,
    },
    submitButtonView:{
        flex: 2,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D9232D',
    },
    spaceView:{
        flex: 0.15,
       backgroundColor: 'white',
    },
    cancelButtonView:{
        flex: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButtonTextStyle:{
        fontSize: 14,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        color: '#2A2E43',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 4,
    },
    submitButtonTextStyle:{
        fontSize: 14,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        color: 'white',
        backgroundColor: '#D9232D',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 4,
    },

    scrollViewStyle: {
        flex:1,
    },

    dropdownStyle:{
        backgroundColor: 'transparent',
        marginTop: -35,
        padding: 10,
    },

});