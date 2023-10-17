import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import {CUSTOM_FONT } from '../../constants/strings';

import {colors} from '../../constants';
const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    // ***************************** //
    //        RIGHT SIDE DRAWER           //
    profileTopContainer: {
        height: '90%',
        backgroundColor: 'white',
    },
    profileContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    userContainerStyle: {
        backgroundColor: colors.BACKGROUND_COLOR,
    },
    profileIconStyle: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 12,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40,
    },
    nameTextStyle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#454F63',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        fontFamily:CUSTOM_FONT.HEEBO_MEDIUM,
    },
    nameEmailStyle: {
        fontSize: 14,
        color: '#898A8F',
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,
    },
    namePhoneStyle: {
        fontSize: 14,
        color: '#898A8F',
        marginTop: 5,
        marginLeft: 20,
        marginBottom:20,
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,
    },
    companyInfoStyle: {
        fontSize: 11,
        color: '#C6C7CC',
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    companyNameStyle: {
        fontSize: 16,
        color: '#454F63',
        fontWeight: '700',
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        fontFamily:CUSTOM_FONT.HEEBO_MEDIUM,
    },
    smallHeaderTextStyle: {
        fontSize: 10,
        color: '#C6C7CC',
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    smallTextStyle: {
        fontSize: 14,
        color: '#454F63',
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,
    },

    // ***************************** //
    //        FILTER SIDE DRAWER           //

    filterViewStyle: {
        marginLeft: 20,
        marginTop: 44,
        marginRight: 20,
        marginBottom: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    filterTextStyle: {
        fontSize: 16,
        color: '#454F63',
    },
    crosImageStyle: {
        height: 15,
        width: 15,
        resizeMode: 'contain'
    },
    subTitle: {
        fontSize: 12,
        color: '#898A8F',
        marginLeft: 20,
        marginRight: 20,
    },
    placedInViewRowStyle: {
        marginLeft: 20,
        marginTop: 10,
        marginRight: 20,
        marginBottom: 10,
        flexDirection: 'row',
    },
    poViewRowStyle: {
        marginLeft: 20,
        marginTop: 10,
        marginRight: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    placedInButtonViewStyle: {
        backgroundColor: '#78849E29',
        borderRadius: 4,
        marginRight: 15,
    },
    openPoButtonViewStyle: {
        flex: 1,
        backgroundColor: '#78849E29',
        borderRadius: 4,
        marginRight: 15,
    },
    closePoButtonViewStyle: {
        flex: 1,
        backgroundColor: '#78849E29',
        borderRadius: 4,
    },
    placedInButtonTextStyle: {
        padding: 10,
        fontSize: 12,
        borderRadius: 4,
        fontWeight: 'bold',
    },
    placedInButtonTextSelectedStyle: {
        padding: 10,
        fontSize: 12,
        borderRadius: 4,
        fontWeight: 'bold',
        color: 'red'
    },
    poTypeInButtonTextStyle: {
        padding: 10,
        fontSize: 12,
        borderRadius: 4,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    poTypeInButtonTextSelectedStyle: {
        padding: 10,
        fontSize: 12,
        borderRadius: 4,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red'
    },
    selectDataTitle: {
        fontSize: 12,
        color: '#898A8F',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        marginTop: 30,
    },
    poTitle: {
        fontSize: 12,
        color: '#898A8F',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 0,
        marginTop: 15,
    },

    selectFromAndToDataTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },

    selectFromDataView: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    selectToDataView: {
        flex: 1,
        alignItems: 'flex-end',
    },
    subTitle2: {
        fontSize: 12,
        color: '#898A8F',
    },

    cancelAndApplyFilterView: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    cancelAndApplyButtonView: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginLeft: 25,
        marginRight: 25,
        marginTop: 30,
        marginBottom: 25,
        height: 50,
    },
    cancelButtonView: {
        flex: 1,
        borderRadius: 4,
    },
    applyButtonView: {
        flex: 1.5,
        borderRadius: 4,
    },
    spaceView: {
        flex: 0.2,
        backgroundColor: 'white',

    },
    cancelButtonTextStyle: {
        flex: 1,
        fontSize: 14,
        fontWeight: "bold",
        color: '#2A2E43',
        backgroundColor: '#78849E29',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 4,
    },
    applyButtonTextStyle: {
        flex: 1,
        fontSize: 14,
        fontWeight: "bold",
        color: 'white',
        backgroundColor: '#D9232D',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 4,
    },

});