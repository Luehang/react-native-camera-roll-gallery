import React, { Component } from "react";
import {
  Platform,
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Text
} from "react-native";
import CameraRollGallery from "react-native-camera-roll-gallery";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;

const backIcon = require("./assets/arrow_back_ios_white_36dp.png");

export default class ReactNativeCameraRollGalleryExample extends Component {
  _renderHeaderComponent = () => {
    return (
      <View style={{backgroundColor: "#368FFA"}}>
        <View style={[styles.statusBarTop, styles.header, styles.mobileHeader]}>
          <Text style={[styles.title, styles.whiteText]}>Camera Roll</Text>
        </View>
        <View style={styles.listTab}>
        </View>
      </View>
    );
  }

  _renderPageHeader = (image, i, onClose) => {
    return (
      <View style={[styles.statusBarTop, styles.header, styles.pageHeader]}>
        <TouchableWithoutFeedback onPress={() => {onClose();}}>
          <Image source={backIcon} style={{marginLeft: 10, height: 30, width: 30}} />
        </TouchableWithoutFeedback>
        <View style={{}}>
          <Text style={[styles.profilePrimary, styles.whiteText]}>Lue Hang</Text>
          <Text style={[styles.profileSecondary, styles.whiteText]}>{image.filename}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <CameraRollGallery
          cameraRollListHeader={this._renderHeaderComponent}
          renderPageHeader={this._renderPageHeader}
        />
      </View>
    );
  }
}

function isIPhoneX() {
  const X_WIDTH = 375;
  const X_HEIGHT = 812;
  return (
    Platform.OS === "ios" &&
      ((deviceHeight === X_HEIGHT && deviceWidth === X_WIDTH) ||
      (deviceHeight === X_WIDTH && deviceWidth === X_HEIGHT))
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#368FFA"
  },
  statusBarTop: {
    paddingTop: isIPhoneX() ? 30 : platform === "ios" ? 20 : 0
  },
  header: {
    height: isIPhoneX() ? 88 : 64,
    backgroundColor: "transparent"
  },
  mobileHeader: {
    width: deviceWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: 25
  },
  whiteText: {
    color: "#fafafa"
  },
  listTab: {
    height: 16,
    flexDirection: "row",
    borderTopLeftRadius: 7.5,
    borderTopRightRadius: 7.5,
    backgroundColor: "#fff",
    marginBottom: -5
  },
  profilePrimary: {
    fontSize: 14,
    paddingHorizontal: 5
  },
  profileSecondary: {
    fontSize: 12,
    paddingHorizontal: 5
  },
});
