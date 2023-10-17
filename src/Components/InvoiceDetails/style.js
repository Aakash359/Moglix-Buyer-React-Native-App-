import { StyleSheet, Dimensions } from "react-native";
import { CUSTOM_FONT } from "../../constants/strings";

const { width, height } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topSeparator: {
    height: 1,
    width: width,
    backgroundColor: "#C6C7CC",
    marginTop: 1,
    opacity: 0.6,
  },
  containerForIndicator: {
    alignItems: "center",
    // justifyContent:'space-between',
    flexDirection: "row",
    backgroundColor: "white",
    top:25,
  },
  containerFor2Indicator: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerContainer: {
    flexDirection: "row",
    padding: 15,
    marginBottom: -12,
  },
  customLabelInnerView: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 0,
  },
  normalInvoiceView: {
    // flex: 1,
    // marginVertical:10,
    // marginBottom: 20,
  },
  lastView:{
    flex: 1,
    backgroundColor: "white",
    marginBottom: 20,
  },
  dateView: {
    flex: 1,
    marginBottom: 0,
  },
  kamLabelInnerView: {
    flex: 1,
    marginBottom: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  nameWrap: {
    marginBottom: 20,
    marginTop: 20,
    flexDirection: "column",
  },
  phoneWrap: {
    flexDirection: "column",
    bottom: 56,
    left: 130,
  },
  emailWrap: {
    flexDirection: "column",
    bottom: 40,
  },
  stepIndicator2: {
    paddingHorizontal: 40,
    left: 50,
    paddingVertical: 8,
  },
  customLabelTitleTextStyle: {
    fontSize: 14,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F6380",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  Text1Style: {
    fontSize: 14,
    top: 30,
    left: 50,
    width: 100,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  Text12Style: {
    fontSize: 14,
    top: 100,
    left: 50,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  Text2Style: {
    fontSize: 14,
    bottom: 12,
    width:'100%',
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  Text3Style: {
    fontSize: 12,
    bottom: 12,
    width:'100%',
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  whenReturnStyle: {
    bottom: 28,
    color: "red",
    fontSize: 14,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  whenDeliverStyle: {
    bottom: 20,
    color: "red",
    fontSize: 14,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  whenDeliverStyle1: {
    bottom: 12,
    color: "red",
    fontSize: 14,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  whenReturnInitaitedStyle: {
    bottom: 9,
    color: "red",
    fontSize: 14,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  whenReturnSubTitleInitStyle: {
    bottom: 10,
    fontSize: 12,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#898A8F",
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },
  whenReturnSubTitleStyle: {
    bottom: 28,
    fontSize: 12,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#898A8F",
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },
  whenDelieverSubTitleStyle: {
    bottom: 20,
    fontSize: 12,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#898A8F",
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },
  dateStyle2: {
    bottom: 5,
    right: 52,
    fontSize: 14,
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  dateStyle21: {
    bottom: 32,
    right: 80,
    fontSize: 14,
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  dateStyle3: {
    top: 45,
    right: 126,
    fontSize: 14,
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  dateStyle31: {
    top: 100,
    right: 155,
    fontSize: 14,
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  whenDelieverSubTitleStyle1: {
    bottom: 12,
    fontSize: 12,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#898A8F",
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },
  Text34: {
    top: 20,
    fontSize: 15,
    left: 25,
    textAlign: "left",
    fontWeight: "normal",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  DayStyle: {
    top: 0,
    left: 25,
    fontSize: 12,
    textAlign: "left",
    fontWeight: "normal",
    color: "#898A8F",
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },
  DayStyle1: {
    top: 15,
    left: 25,
    fontSize: 12,
    textAlign: "left",
    fontWeight: "normal",
    color: "#898A8F",
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },
  nameStyle: {
    fontSize: 12,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#454F6380",
    left: 15,
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  photoStyle:{
    height: 150,
    width: 100,
    left:40
  },
  itemdetailStyle: {
    fontSize: 15,
    top:20,
    textAlign: 'left',
    textAlignVertical: 'center',
    fontWeight: 'normal',
    color: 'black',
    left:18,
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
 
  msgView:{
    flex:1,
    padding:18,
    marginHorizontal:15,
    borderRadius:7,
    borderWidth:0.5,
    backgroundColor:'white',
    borderColor:'#e0e0e0',
    height:'100%',
   },
  
  dataStyle: {
    fontSize: 15,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#898A8F",
    left: 15,
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  kamStyle: {
    fontSize: 15,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#454F6380",
    top: 10,
    left: 15,
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },

  headerLeftView: {
    flex: 1,
  },
  headerRightView: {
    flex: 1,
    alignItems: "flex-end",
  },
 
  contactContainer: {
    height: 50,
    bottom: 10,
    left: 10,
    zIndex: 1,
  },
  viewProductDesc: {
    flex: 1,
    backgroundColor: "white",
  },
  textProductDesc: {
    color: "#898A8F",
    fontSize: 10,
    marginLeft: 15,
    marginRight: 20,
    marginTop: 15,
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  textDesc: {
    marginTop: 5,
    textAlignVertical: "center",
    fontSize: 14,
    color: "#454F63",
    marginLeft: 15,
    marginRight: 50,
    fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
  },
  viewPriceQuantityAndTAmount: {
    flex: 1,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
  },
  viewPrice: {
    flex: 1,
  },
  viewQuantity: {
    flex: 1,
  },
  viewTotalAmount: {
    flex: 1,
    alignItems: "flex-end",
  },
  LeftText1: {
    right: 0,
    color: "#898A8F",
    fontSize: 10,
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  vendor: {
    right: 0,
    color: "#898A8F",
    fontSize: 10,
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  LeftText2: {
    color: "#454F63",
    fontSize: 14,
    marginTop: 1,
    marginBottom: 1,
    fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
  },
  LeftText3: {
    color: "#898A8F",
    fontSize: 10,
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },

  stepIndicator: {
    marginTop: 10,
    paddingHorizontal: 10,
    marginLeft: 40,
  },
  customLabelView: {
    flex: 1,
    marginTop: 10,
    marginLeft: 0,
    backgroundColor: "white",
    flexDirection: "column",
  },
  upperLabelView: {
    flex: 1,
    justifyContent:'flex-start',
    alignItems:'flex-start',
    marginVertical:0,
    marginLeft: 0,
    flexDirection: "column",
  },
  dateLabelView: {
    flex: 1,
    marginLeft: 0,
    height:30,
    flexDirection: "column",
  },

  kamLabelInnerView: {
    flex: 1,
    marginBottom: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
 
  phoneWrap: {
    flexDirection: "column",
    bottom: 60,
    left: 145,
  },
  emailWrap: {
    flexDirection: "column",
    bottom: 40,
  },
  customLabelSelectedTitleTextStyle: {
    fontSize: 14,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  statusText: {
    fontSize: 14,
    bottom: 35,
    left: 10,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  bottomText: {
    fontSize: 14,
    left: 10,
    top:5,
    textAlign: "left",
    // textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  bottomText2: {
    fontSize: 14,
    left: 10,
    marginBottom:0,
    textAlign: "left",
    // textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  topText: {
    fontSize: 14,
    marginTop:10,
    left: 10,
    textAlign: "left",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  topText1: {
    fontSize: 14,
    marginTop:10,
    left: 10,
    textAlign: "left",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  topText2: {
    fontSize: 14,
    marginTop:0,
    left: 10,
    textAlign: "left",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  DateText2: {
    fontSize: 14,
    top: 72,
    left: 10,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  DateText3: {
    fontSize: 14,
    bottom:60,
    left: 10,
    textAlign: "left",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
 
  kamView:{
    flex:1,
    padding:0,
    top:0,
    backgroundColor:'#f5f5f5',
    marginHorizontal:10,
    borderRadius:10,
  },
  imageWrap:{
    flexDirection:'row'
  },
  Wrap:{
    flexDirection:'column'
  },
  middleText: {
    fontSize: 14,
    left: 10,
    textAlign: "left",
    marginTop:55,
    marginBottom:65,
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  middleText2: {
    fontSize: 14,
    left: 10,
    textAlign: "left",
    marginTop:55,
    marginBottom:60,
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  middleText3: {
    fontSize: 14,
    left: 10,
    textAlign: "left",
    marginTop:50,
    marginBottom:60,
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  DateText1:{
    fontSize: 14,
    left: 10,
    top:1,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  whenReturnStyle: {
    bottom: 28,
    color: "red",
    fontSize: 14,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  whenDeliverStyle: {
    bottom: 20,
    color: "red",
    fontSize: 14,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  whenDeliverStyle1: {
    bottom: 12,
    color: "red",
    fontSize: 14,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  whenReturnInitaitedStyle: {
    bottom: 9,
    color: "red",
    fontSize: 14,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  whenReturnSubTitleInitStyle: {
    bottom: 10,
    fontSize: 12,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#898A8F",
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },
  whenReturnSubTitleStyle: {
    bottom: 28,
    fontSize: 12,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#898A8F",
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },
  whenDelieverSubTitleStyle: {
    bottom: 20,
    fontSize: 12,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#898A8F",
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },
  whenDelieverSubTitleStyle1: {
    bottom: 12,
    fontSize: 12,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#898A8F",
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },
  customLabelSubTitleTextStyle: {
    fontSize: 13,
    bottom: 9,
    left: 20,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
 
 
  
 
  ListViewContainer: {
    flex: 1,
    top: 25,
  },
  flatListStyle: {
    marginBottom: -80,
  },
  inVoiceView: {
    flex: 1,
    padding: 6,
    marginHorizontal: 15,
    borderRadius: 8,
    borderWidth: 0.5,
    backgroundColor: "white",
    borderColor: "#e0e0e0",
    //  marginVertical:normalize(7),
    height: "100%",
  },
  msgView: {
    flex: 1,
    padding: 18,
    marginHorizontal: 15,
    borderRadius: 7,
    borderWidth: 0.5,
    backgroundColor: "white",
    borderColor: "#e0e0e0",
    height: "100%",
  },
  msgWrap: {
    flexDirection: "row",
    left:12,
    bottom:10
  },
  wrapContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  inNuView: {
    padding: 5,
    backgroundColor: "#E5F2FD",
    borderRadius: 4,
  },
  inNo: {
    color: "#F5681E",
    fontSize: 12,
    fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
    alignSelf: "center",
  },
  date0: {
    fontSize: 14,
    bottom:5,
    marginVertical: 30,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  date: {
    fontSize: 14,
    marginVertical: 30,
    top:0,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  date2: {
    fontSize: 14,
    marginVertical: 30,
    top:8,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  time: {
    fontSize: 12,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "normal",
    color: "#898A8F",
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },
  qty: {
    marginTop: 5,
    textAlignVertical: "center",
    fontSize: 14,
    left: 65,
    color: "#454F63",
    width: "50%",
    fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
  },
  nostyle: {
    marginTop: 5,
    textAlignVertical: "center",
    fontSize: 14,
    color: "#454F63",
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  trackWrap: {
    flexDirection: "row",
  },
  dot: {
    padding: 5,
    backgroundColor: "orange",
    width: 12,
    height: 12,
    top: 22,
    left: 5,
    borderRadius: 8,
  },
  invoiceSeparater: {
    height: 0.5,
    backgroundColor: "#e0e0e0",
    marginTop: 20,
    marginHorizontal: -7,
  },
  rowItem: {
    flex: 3,
    paddingVertical: 0,
    backgroundColor: "white",
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: "#333333",
    paddingVertical: 16,
    fontWeight: "600",
  },
  body: {
    flex: 1,
    fontSize: 15,
    color: "#606060",
    lineHeight: 24,
    marginRight: 8,
  },
  separater: {
    height: 5,
    backgroundColor: "lightgray",
    marginTop: 15,
  },
  contactContainer: {
    backgroundColor: "transparent",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    left: 10,
    bottom: -20,
  },
  imageStyle: {
    height: 50,
    width: 50,
    resizeMode: "contain",
    marginLeft: 15,
    backgroundColor: "#898A8F1F",
  },
  viewItemIdBGStyle: {
    borderRadius: 4,
    flexDirection: "row",
    marginLeft: 15,
    marginTop: 0,
  },
  partNuView: {
    padding: 2,
    backgroundColor: "#898A8F1F",
    borderRadius: 4,
  },
  textItemsID: {
    color: "#898A8F",
    fontSize: 12,
    fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
    textAlign: "center",
    textAlignVertical: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  topSeparator: {
    height: 1,
    width: width,
    backgroundColor: "#C6C7CC",
    marginTop: 1,
    opacity: 0.6,
  },
  bottomSeparator: {
    height: 5,
    width: width,
    marginTop: 10,
    backgroundColor: "#00000017",
    opacity: Platform.OS === "ios" ? 1 : 0.3,
  },
});
