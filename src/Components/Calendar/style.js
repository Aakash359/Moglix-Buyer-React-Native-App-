import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import {CUSTOM_FONT } from '../../constants/strings';
const { width,height } = Dimensions.get('window')

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topSeparator: {
        height: 1,
        width: width,
        backgroundColor: 'gray',
        marginTop: 1,
        opacity: 0.2,
    },
    selectFromDataView:{
        flex:1,
        justifyContent: 'flex-start',
    },
    placedInViewRowStyle:{
        marginLeft: 20,
        marginTop: 20,
        marginRight: 20,
        marginBottom: 10,
        flexDirection: 'row',
    },
    subTitle2:{
        fontSize: 12,
        color: '#898A8F80',
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
    },
    toDateStyle:{
        fontSize: 12,
        color: '#898A8F80',
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        textAlign:'right',
    },
    selectFromAndToDataTitle:{
        fontSize: 16,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        marginTop: 1,
        color:'#454F63'
    },
    selectToDataView:{
        flex:1,
        alignItems: 'flex-end',
    },
    daysNameViewStyle: {
        marginTop: 15,
        marginBottom: 3,
        marginLeft:8,
        marginRight: 8,
        height:40,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    daysNameTextStyle: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'white',
        color: '#898A8F80',
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
    },
    separatorView:{
        height: 1,
        width: width,
        backgroundColor: '#00000017',
    },
    doneButtonView:{
        height: 46,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#D9232D',
        borderRadius: 4,
        justifyContent:'center',
        alignItems:'center',
    },

    doneButtonViewWithOpacity:{
        height: 46,
        opacity: 0.4,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#D9232D',
        borderRadius: 4,
        justifyContent:'center',
        alignItems:'center',
    },
    doneButtonText:{
        color: 'white',
        fontSize: 14,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
    },
    calendarView:{
        height: (Platform.OS === 'ios' ? height - 310 : height - 290),
    },
});