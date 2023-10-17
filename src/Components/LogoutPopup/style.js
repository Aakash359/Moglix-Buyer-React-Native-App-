import {
    StyleSheet,
    Dimensions,
} from 'react-native';

import {colors} from '../../constants';
import {CUSTOM_FONT } from '../../constants/strings';

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({

    // Logout style...
    logoutStyle: {
        height: 46,
        width: 240,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.DEFAULT_RED_COLOR,
        borderRadius: 4,
        borderWidth: 1,
    },
    logoutTextStyle: {
        fontSize: 14,
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        color: colors.DEFAULT_RED_COLOR,
    },

    //Logout Popup style...
    logoutContainer: {
        flex: 1,
        backgroundColor: '#0000004D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutPopupContainer: {
        height: 210,
        width: '90%',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        borderRadius: 12,
    },
    logoutTitleStyle: {
        fontSize: 26,
        color: '#454F63',
        fontFamily:CUSTOM_FONT.ROBOTO_BOLD,
        marginTop: 15,
        marginLeft: 24,
    },
    logoutDescriptionStyle: {
        fontSize: 14,
        color: '#454F63',
        marginTop: 14,
        marginLeft: 24,
        marginRight: 24,
        opacity: 0.68,
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,
    },
    buttonContainer: {
        height: 44,
        flexDirection: 'row',
        marginLeft: 24,
        marginRight: 24,
        marginTop: 24,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        //alignItems:'flex-end',
    },
    logoutCancelContainer: {
        width: width*0.35,
        height: 44,
        backgroundColor: '#454F63',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutCancelText: {
        fontSize: 14,
        color: 'white',
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
    },
    logoutButtonContainer: {
        width: width*0.35,
        height: 44,
        backgroundColor: '#78849E29',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButtonText: {
        fontSize: 14,
        color: '#2A2E43',
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
    }
});