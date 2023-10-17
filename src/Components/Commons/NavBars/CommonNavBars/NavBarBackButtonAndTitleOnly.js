import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native'; 
import {styles} from '../style'; 
import {ICON} from '../../../../constants';


export default function NavBarBackButtonAndTitleOnly(props) {
    return (
      <View style={styles.navBarStyle}>
        <TouchableOpacity onPress={props.BackAction}>
            <View style={styles.navBarHamburgerButtonStyle}>
            <Image
                style={styles.imageDownArrow}
                source={ICON.IC_BACK_LOGO}
            />
            </View>
        </TouchableOpacity>
        <View style={styles.navBarTitleViewStyle}>
            <Text style={styles.titleStyle}>{props.title}</Text>
        </View>
      </View>
    );
}
