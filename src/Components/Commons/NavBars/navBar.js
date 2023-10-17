import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import {styles} from './style'; 
import PropTypes from 'prop-types';
import {ICON} from '../../../constants';
import {PlantListPopup} from '../../../Components'


export default class NavBar extends React.Component {

    static propTypes = {
        DrawerAction:PropTypes.func,
        company:PropTypes.string,
        branch:PropTypes.string,
        branchId:PropTypes.string,
        onSubmitAction:PropTypes.func,
    }

    static defaultProps = {
        company:'',
        branch:'',
        branchId:'',
        companyId:''
    }
    
    constructor(props) {
        super(props);
    }

    onSubmitAction = (data) => {
        const {onSubmitAction} = this.props
        onSubmitAction(data)
    }

    render() {
        const {DrawerAction, company, branch, branchId} = this.props
        return (
            <View style={styles.navBarStyle}>
              <TouchableOpacity onPress={DrawerAction}>
                  <View style={styles.navBarHamburgerButtonStyle}>
                  <Image
                      style={styles.imageDownArrow}
                      source={ICON.IC_MENU}
                  />
                  </View>
              </TouchableOpacity>
              <View style={styles.navBarTitleViewStyle}>
                  <Text style={styles.navBarTitleStyle}>{global.GLOBAL_COMPANY_NAME}</Text>
                  <Text style={styles.navBarSubtitleStyle}>{global.GLOBAL_BRANCH_NAME}</Text>
              </View>
      
              <PlantListPopup 
                  company = {company}
                  branch = {branch}
                  branchId = {branchId}
                  onSubmitAction = {this.onSubmitAction}
              />
            </View>
          );
    }
}