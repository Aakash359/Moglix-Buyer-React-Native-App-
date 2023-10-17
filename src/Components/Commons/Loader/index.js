import React, { Component } from 'react';
import Spinner from 'react-native-spinkit';
import { View } from 'react-native';
import { colors } from '../../../constants';

export default class Loader extends Component {
    state = {
        index: 0,
        types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
        size: 60,
        color: colors.DEFAULT_LOADER_COLOR,
        isVisible: true
    }

    render() {
        let type = this.state.types[8]
        return (
            <View>
                <Spinner style={{ justifyContent: 'center', alignSelf: 'center', elevation: 5 }}
                    isVisible={this.state.isVisible}
                    size={this.state.size} type={type}
                    color={this.state.color} />
            </View>
        )
    }
}
