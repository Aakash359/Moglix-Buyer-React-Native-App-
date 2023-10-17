import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native'; 
import {styles} from '../style'; 
import {ICON} from '../../../../constants';

// Create Navigation Bar...
export default function InvoiceDetailsNavBar(props) {
    return (
      <View style={styles.navBarStyle}>
        <TouchableOpacity 
        onPress={props.BackAction}
        >
            <View style={styles.navBarHamburgerButtonStyle}>
            <Image
                style={styles.imageDownArrow}
                source={ICON.IC_BACK_LOGO}
            />
            </View>
        </TouchableOpacity>
        <View style={[styles.navBarTitleViewStyle2,styles.navBarTitleViewStyle3]}>
            <Text style={styles.navBarTitleStyle}>{props.inVoiceNum}</Text>
            <Text style={styles.navBarSubtitleStyle}>{props.dateAndTime}</Text>
        </View>
        {(props.buttonTitle=='VIEW PO') &&
        <TouchableOpacity onPress={props.ViewPOAction}>
            <View style={styles.navBarViewPoButtonStyle}>
           <Text style={styles.viewPOTextColorStyle}>{props.buttonTitle}</Text>
            </View>
        </TouchableOpacity>
        }
      </View>
    );
}