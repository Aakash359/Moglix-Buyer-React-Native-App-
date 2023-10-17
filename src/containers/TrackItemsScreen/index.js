import React, { Component } from 'react'
import {View,BackHandler,Keyboard } from 'react-native'
import {TrackItem} from '../../Components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTrackItemDetailData,getInvoiceRequest} from "../../actions";
import { isLoading, itemTrackDetailData,itemInvoiceDetailData, } from '../../reducers/OrderListDetailReducer';
import GlobalStyle from './../../style';
import { Loader } from '../../Components/Commons'
import DatabaseManager from './../../Storage/storage';
import {GlobalService}  from '../../utils/GlobalService.js'

class TrackItemsScreen extends Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        itemsTrackDetailData: PropTypes.array,
        getOrderListDetailD: PropTypes.array,
        getInvoiceListData:PropTypes.func,
    }

    static defaultProps = {
     invoiceDetailsData:[],
   }

    constructor(props) {
        super(props)
        this.state = {itemsDetailData:{}, userData:{}}
        this.getTrackItemDetail()
      }

      backAction = () => {
        this.props.navigation.goBack()
      }

    viewPoAction = () => {
      const { navigation } = this.props;
      this.props.navigation.navigate('OrderDetalsScreen', {SelectedItemsDetail: navigation.getParam('SelectedItemsDet') })
    }

    componentDidMount() {
      this.getInvoiceDetail()
      GlobalService.AnalyticScreen('TrackItemsScreen')
      Keyboard.dismiss()
      if(this.props.navigation.getParam('fromLinking')){
        const { navigation } = this.props;
        setTimeout(() => {
          this.viewPoAction()
        }, 1000);
      }
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
        this.setState({'userData':JSON.parse(userDataTemp)})
        
        const data = {
           itemID: dataTrackItem.id, 
           application:'1',
           idBranch: '8855', 
           idCompany: '8653',
           userId: this.state.userData.userId,
           Origin: ' https://buyersqa.moglix.com', 
           token: this.state.userData.token,
        }
        const { getOrderListDetailD } = this.props;
        getOrderListDetailD(data)
      }

      getInvoiceDetail = async () => {
        const {navigation} = this.props
        const sourceId = navigation.getParam('SelectedItemsDet')
        let userDataTemp = await DatabaseManager.getUserProfile()
        this.setState({'userData':JSON.parse(userDataTemp)},()=>{
          const params = {
            token:this.state.userData.token,
            userId:this.state.userData.userId,
            sourceId:sourceId.id,
          }
          const {getInvoiceListData} = this.props;
          getInvoiceListData(params)
        })
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
      const { isLoading, itemsTrackDetailData,invoiceDetailsData } = this.props
      const { navigation } = this.props;
        return (
          <View style={{
            flex: 1,
        }}>
            <TrackItem
            invoiceDetailsData={invoiceDetailsData}
            onPressBackButton= {this.backAction}
            onPressViewPoButton= {this.viewPoAction}
            nav= {this.props.navigation}
            navShowWithViewButton = {navigation.getParam('comingFromItemsScreen')}
            SelectedItemsD= {navigation.getParam('SelectedItemsDet')}
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
    invoiceDetailsData : itemInvoiceDetailData(state),
    itemsTrackDetailData: itemTrackDetailData(state),
  }
  );
  
  export default connect(mapStateToProps, {
    getOrderListDetailD: getTrackItemDetailData,
    getInvoiceListData: getInvoiceRequest,
  })(TrackItemsScreen);