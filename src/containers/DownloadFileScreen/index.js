import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { DownloadFile } from '../../Components';

export default class DownloadFileScreen extends Component {

      backAction = () => {
        this.props.navigation.goBack()
    }

    componentDidMount() {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.goBack()
        return true;
      });
    }
  
    componentWillUnmount() {
      this.backHandler.remove();
    }

    render() {
      const { navigation } = this.props;
        return (
            <DownloadFile 
            onPressBackButton= {this.backAction}
            pdfURL = {navigation.getParam('pdfURL')}
            />
        )
    }
}