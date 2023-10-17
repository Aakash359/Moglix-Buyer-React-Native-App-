import { StyleSheet, Dimensions } from "react-native";
import { CUSTOM_FONT } from "../../../constants/strings";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  // ***************************** //
  // Nav Bar HOME SCREEN //
  navBarStyle: {
    height: 65,
    width: width,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  navBarHamburgerButtonStyle: {
    height: 44,
    width: 44,
    marginLeft: 8,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  navBarArrowButtonStyle: {
    height: 44,
    width: 44,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  viewPOTextColorStyle: {
    color: "#D9232D",
    fontSize: 12,
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  navBarViewPoButtonStyle: {
    height: 36,
    width: 100,
    marginRight: 8,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    borderColor: "#D9232D",
    borderWidth: 1,
    borderRadius: 5,
  },
  navBarTitleViewStyle: {
    height: 40,
    width: width - 160,
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: 8,
  },
  navBarSearchOrderViewStyle: {
    height: 40,
    width: width - 115,
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: 8,
    marginRight: 8,
    borderColor: "#C6C7CC99",
    borderRadius: 6,
    borderWidth: 1,
    shadowColor: "gray",
    shadowOpacity: Platform.OS === "ios" ? 0.3 : 1,
    shadowRadius: 4,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  searchOrderStyle: {
    fontSize: 14,
    color: "#C6C7CC",
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
    marginLeft: 8,
  },
  navBarTitleViewStyle2: {
    height: 44,
    width: width - 170,
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: 8,
  },
  navBarTitleViewStyle3: {
    height: 44,
    width: width - 100,
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: 8,
  },
  navBarTitleStyle: {
    fontWeight: "500",
    fontSize: 16,
    color: "#454F63",
    height: 20,
    fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
  },
  navBarSubtitleStyle: {
    fontSize: 12,
    height: 15,
    color: "#898A8F",
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },
  imageDownArrow: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  titleStyle: {
    color: "#454F63",
    fontSize: 16,
    fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
  },
  // ***************************** //

  // ***************************** //
  // Nav Bar SEARCH ORDER SCREEN //
  navBarStyleSearch: {
    height: 50,
    width: width,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  navBarBackButtonStyleSearch: {
    height: 44,
    width: 44,
    marginLeft: 8,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackButton: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  imageCloseButton: {
    width: 14,
    height: 14,
    resizeMode: "contain",
  },
  navBarInputViewStyleSearch: {
    height: 44,
    width: width - 120,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 8,
  },
  inputTextStyle: {
    color: "#454F63",
    fontSize: 14,
    marginLeft: 8,
    marginRight: 8,
    width: "50%",
    height: 38,
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },
  crossButtonContainer: {
    height: 44,
    width: 44,
    backgroundColor: "blue",
  },
  imageCrossButton: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  // ***************************** //
});
