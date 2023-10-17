import React, { Component } from 'react'
import { BackHandler, View } from 'react-native'
import {TrackItem} from '../../Components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTrackItemDetailData,getInvoiceRequest } from "../../actions";
import { isLoading, itemTrackDetailData ,itemInvoiceDetailData} from '../../reducers/OrderListDetailReducer';
import GlobalStyle from './../../style';
import { Loader } from '../../Components/Commons'
import DatabaseManager from './../../Storage/storage';

class TrackItemStatusScreen extends Component {
   
  static propTypes = {
    isLoading: PropTypes.bool,
    itemsTrackDetailData: PropTypes.array,
    getOrderListDetailD: PropTypes.array,
}

static defaultProps = {
}

constructor(props) {
    super(props)
    this.state = {itemsDetailData:{}, userData2:{}}
    this.getTrackItemDetail()
    
  }

      backAction = () => {
        this.props.navigation.goBack()
    }

    viewPoAction = () => {
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

    getTrackItemDetail = async () => {
      const {navigation} = this.props
      const dataTrackItem = navigation.getParam('SelectedItemsDet')
      
      let userDataTemp = await DatabaseManager.getUserProfile()
        this.setState({'userData2':JSON.parse(userDataTemp)})
        
        const data = {
           itemID: dataTrackItem.id, 
           application:'1',
           idBranch: '8855', 
           idCompany: '8653',
           userId: this.state.userData2.userId,
           token: this.state.userData2.token,
           Origin: 'https://buyersqa.moglix.com', 
        }
        const { getOrderListDetailD } = this.props;
        getOrderListDetailD(data)
      }

    

      getSortedArray(itemsTrackDetailData){
        try{
          itemsTrackDetailData.sort(function(a, b) {
            var c = new Date(a.CreationDate);
            var d = new Date(b.CreationDate);
            return c-d;
        });
           }catch(error){
    
           }
           return itemsTrackDetailData
      }

    render() {
      const { navigation, isLoading, itemsTrackDetailData,invoiceDetailsData } = this.props;
      
      itemsTrackDetailData.sort(function(a, b) {
        var c = new Date(a.CreationDate);
        var d = new Date(b.CreationDate);
        return c-d;
    });

        return (
          <View style={{flex: 1,}}>
            <TrackItem
            onPressBackButton= {this.backAction}
            onPressViewPoButton= {this.viewPoAction}
            nav= {this.props.navigation}
            navShowWithViewButton = {navigation.getParam('comingFromItemsScreen')}
            SelectedItemsD= {navigation.getParam('SelectedItemsDet')}
            invoiceDetailsData={invoiceDetailsData}
            itemsTrackDetailD={this.getSortedArray(itemsTrackDetailData)}
             />
             {(isLoading) &&
                 <View style={GlobalStyle.loaderStyle}>
                  <Loader />
                 </View>
             }
         </View>
        )
    }
}


const mapStateToProps = state => ({
  isLoading: isLoading(state),
  itemsTrackDetailData: itemTrackDetailData(state),
  invoiceDetailsData : itemInvoiceDetailData(state),
}
);

export default connect(mapStateToProps, {
  getOrderListDetailD: getTrackItemDetailData,
})(TrackItemStatusScreen);