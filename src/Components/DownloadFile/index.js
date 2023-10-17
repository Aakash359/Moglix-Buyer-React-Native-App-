import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  BackHandler,
  View,
  Text,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
} from "react-native";
import NavBarBackButtonAndTitleOnly from "../../Components/Commons/NavBars/CommonNavBars/NavBarBackButtonAndTitleOnly";

import PropTypes from "prop-types";
import Pdf from "react-native-pdf";
import GlobalStyle from "./../../style";
import { Loader } from "../../Components/Commons";
import ReactNativeBlobUtil from "react-native-blob-util";

export default class DownloadFile extends Component {
  static propTypes = {
    onPressBackButton: PropTypes.func,
    pdfURL: PropTypes.string,
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.goBack();
      return true;
    });
  }

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    const { pdfURL } = this.props;

    this.downloadFile();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  actualDownload = () => {
    //commenting rn-fetch-blob
    const { dirs } = ReactNativeBlobUtil.fs;
    const { pdfURL } = this.props;
    ReactNativeBlobUtil.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: Date().toString(),
        path: `${dirs.DownloadDir}/${new Date().getTime()}.pdf`,
      },
    })
      .fetch("GET", pdfURL, {})
      .then((res) => {
        alert(res.path());
      })
      .catch((e) => {
        alert(e);
      });
  };

  downloadFile = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload();
      } else {
        Alert.alert(
          "Permission Denied!",
          "You need to give storage permission to download the file"
        );
      }
    } catch (err) {
      alert(err);
      console.warn(err);
    }
  };

  render() {
    const { onPressBackButton, pdfURL } = this.props;

    const source = { uri: pdfURL };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <NavBarBackButtonAndTitleOnly
            BackAction={onPressBackButton}
            title={""}
          />
          <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              this.setState({ isLoading: false });
            }}
            onPageChanged={(page, numberOfPages) => {}}
            onError={(error) => {
              this.setState({ isLoading: false });
            }}
            onPressLink={(uri) => {}}
            style={styles.pdf}
          />

          {this.state.isLoading && (
            <View
              style={[
                GlobalStyle.loaderStyle2,
                { backgroundColor: "white", opacity: 1 },
              ]}
            >
              <View style={[GlobalStyle.loaderStyle]}>
                <Loader />
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
