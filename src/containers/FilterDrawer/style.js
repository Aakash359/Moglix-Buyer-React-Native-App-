import {
    StyleSheet,
} from 'react-native';
import {CUSTOM_FONT } from '../../constants/strings';

export const styles = StyleSheet.create({

// ***************************** //
    //        FILTER SIDE DRAWER           //
    container:{
        flex:1,
    },
    filterViewStyle:{
        marginLeft: 20,
        marginTop: 20,
        marginRight: 20,
        marginBottom: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    filterTextStyle:{
        fontSize: 16,
        color: '#454F63',
        fontFamily:CUSTOM_FONT.HEEBO_MEDIUM,
    },
    crosImageStyle:{
        height:15,
        width:15,
        resizeMode: 'contain'
    },
    subTitle:{
        fontSize: 12,
        color: '#898A8F80',
        marginLeft: 20,
        marginRight: 20,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
    },
    allPlant:{
        fontSize: 12,
        color: '#898A8F80',
        marginLeft: 80,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
    },
    placedInViewRowStyle:{
        marginLeft: 20,
        marginTop: 10,
        marginRight: 20,
        marginBottom: 10,
        flexDirection: 'row',
    },
    toogleViewStyle:{
        flexDirection: 'row',
    },
    wrapView:{
        justifyContent:'space-around',
        flexDirection: 'row',
    },
    toggleStyle:{
     bottom:5,
     marginHorizontal:5,
     left:10,
    },
    poViewRowStyle:{
        marginLeft: 20,
        marginTop: 10,
        marginRight: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    placedInButtonViewStyle:{
        backgroundColor: '#78849E29',
        borderRadius: 4,
        marginRight: 15,
    },
    placedInButtonSelectedViewStyle:{
        backgroundColor: '#D9232D14',
        borderRadius: 4,
        marginRight: 15,
    },
    openPoButtonViewStyle:{
        flex: 1,
        backgroundColor: '#78849E29',
        borderRadius: 4,
        marginRight: 15,
    },
    openPoButtonSelectedViewStyle:{
        flex: 1,
        backgroundColor: '#D9232D14',
        borderRadius: 4,
        marginRight: 15,
    },
    closePoButtonViewStyle:{
        flex: 1,
        backgroundColor: '#78849E29',
        borderRadius: 4,
    },
    closePoButtonSelectedViewStyle:{
        flex: 1,
        backgroundColor: '#D9232D14',
        borderRadius: 4,
    },
    placedInButtonTextStyle:{
        padding: 10,
        fontSize: 12,
        borderRadius: 4,
        color:'#454F63',
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
    },
    placedInButtonTextSelectedStyle:{
        padding: 10,
        fontSize: 12,
        borderRadius: 4,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        color:'red'
    },
    poTypeInButtonTextStyle:{
        padding: 10,
        fontSize: 12,
        borderRadius: 4,
        color:'#454F63',
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        textAlign: 'center',
    },
    poTypeInButtonTextSelectedStyle:{
        padding: 10,
        fontSize: 12,
        borderRadius: 4,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        textAlign: 'center',
        color:'red'
    },
    selectDataTitle:{
        fontSize: 12,
        color: '#898A8F80',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 0,
        marginTop: 20,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
    },
    poTitle:{
        fontSize: 12,
        color: '#898A8F80',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 0,
        marginTop: -10,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
    },

    selectFromAndToDataTitle:{
        fontSize: 14,
        color:'#454F63',
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        marginTop: 5,
    },

    selectFromDataView:{
        flex:1,
        justifyContent: 'flex-start',
    },
    selectToDataView:{
        flex:1,
        alignItems: 'flex-end',
    },
    subTitle2:{
        fontSize: 12,
        color: '#898A8F80',
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
    },

    cancelAndApplyFilterViewWithOpacity:{
        flex: 1,
        justifyContent: 'flex-end',
        opacity: 0.2,
    },

    cancelAndApplyFilterView:{
        flex: 1,
        justifyContent: 'flex-end',
    },

    cancelAndApplyButtonView:{
        flexDirection:'row',
        justifyContent: "space-around",
        marginLeft: 25,
        marginRight: 25,
        marginTop: 30,
        marginBottom: 25,
        height: 46,
        alignItems:'center',
    },
    cancelButtonView:{
        flex: 1,
        borderRadius: 4,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
    },
    applyButtonView:{
        flex: 1.5,
        borderRadius: 4,
        backgroundColor: '#D9232D',
        alignContent:'center',
        justifyContent:'center',
    },
    applyButton:{
        // flex: 1.5,
        top:0,
        left:150,
        width:80,
        height:30,
        borderRadius: 4,
        backgroundColor: 'black',
        alignContent:'flex-end',
        justifyContent:'center',
    },
    apply:{
        justifyContent:'center',
        alignSelf:'center'
    },
    spaceView:{
        flex: 0.2,
        backgroundColor: 'white',
    },
    cancelButtonTextStyle:{
        flex:1,
        fontSize: 14,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        color: '#454F63',
        padding:14,
    },
    applyButtonTextStyle:{
        flex:1,
        fontSize: 14,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        color: 'white',
        padding:14,
    },

});