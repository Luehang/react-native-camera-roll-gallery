import React from "react";
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
// import CameraRollGallery from "./src";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;

const backIcon = require("./assets/arrow_back_ios_white_36dp.png");

export default class ReactNativeCameraRollGalleryExample extends React.PureComponent {
  _renderHeaderComponent = () => {
    return (
      <View style={{backgroundColor: "#368FFA"}}>
        <View style={[styles.statusBarTop, styles.header, styles.mobileHeader]}>
          <Text style={[styles.title, styles.whiteText]}>Camera Roll</Text>
        </View>
        <View style={styles.listTab}/>
      </View>
    );
  }

  _renderPageHeader = (item, i, onClose) => {
    return (
      <View style={[styles.statusBarTop, styles.header, styles.pageHeader]}>
        <TouchableWithoutFeedback onPress={() => {onClose();}}>
          <Image source={backIcon} style={{marginLeft: 10, height: 30, width: 30}} />
        </TouchableWithoutFeedback>
        <View style={{}}>
          <Text style={[styles.profilePrimary, styles.whiteText]}>Lue Hang</Text>
          {/* <Text style={[styles.profileSecondary, styles.whiteText]}>
            {platform === "ios" ? i + ":  " + item.image.filename : i + ":  " + item.uri}
          </Text> */}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <CameraRollGallery
          enableCameraRoll={true}
          cameraRollListHeader={this._renderHeaderComponent}
          renderPageHeader={this._renderPageHeader}
        />
        {/* <CameraRollGallery
          enableCameraRoll={false}
          onGetData={() => {
            return {
              assets: [
                // Can be used with different image object fieldnames.
                // Ex. source, source.uri, uri, URI, url, URL
                { uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg" },
                // { source: require("yourApp/image.png"),
                //     // IMPORTANT: It is REQUIRED for LOCAL IMAGES
                //     // to include a dimensions field with the
                //     // actual width and height of the image or
                //     // it will throw an error.
                //     dimensions: { width: 1080, height: 1920 } },
                { source: { uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg" } },
                { uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg" },
                { URI: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg" },
                { url: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg" },
                { URL: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg" },
              ],
              pageInfo: {
                hasNextPage: false
              }
            };
          }}


          cameraRollListHeader={this._renderHeaderComponent}
          // renderPageHeader={this._renderPageHeader}
        /> */}
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
  // profileSecondary: {
  //   fontSize: 12,
  //   paddingHorizontal: 5
  // },
});
