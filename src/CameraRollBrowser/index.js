import React from "react";
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { findUri } from "../utils";
import PropTypes from "prop-types";

import ImageCell from "./ImageCell";

export default class CameraRollBrowser extends React.PureComponent {
  static propTypes = {
    enableCameraRoll: PropTypes.bool,
    onGetData: PropTypes.func,
    itemCount: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    imagesPerRow: PropTypes.number,
    initialNumToRender: PropTypes.number,
    removeClippedSubviews: PropTypes.bool,
    cameraRollFlatListProps: PropTypes.object,
    catchGetPhotosError: PropTypes.func,
    groupTypes: PropTypes.oneOf([
      "Album",
      "All",
      "Event",
      "Faces",
      "Library",
      "PhotoStream",
      "SavedPhotos",
    ]),
    assetType: PropTypes.oneOf([
      "Photos",
      "Videos",
      "All",
    ]),
    imageMargin: PropTypes.number,
    containerWidth: PropTypes.number,
    backgroundColor: PropTypes.string,
    emptyText: PropTypes.string,
    emptyTextStyle: Text.propTypes.style,
    loader: PropTypes.node,
    cameraRollListHeader: PropTypes.func,
    cameraRollListFooter: PropTypes.func,
    imageContainerStyle: PropTypes.object,
    renderIndividualHeader: PropTypes.func,
    renderIndividualFooter: PropTypes.func,
    onEndReached: PropTypes.func,
    onEndReachedThreshold: PropTypes.number,

    openImageViewer: PropTypes.func.isRequired,
		displayImageViewer: PropTypes.bool.isRequired,
		displayedImageId: PropTypes.string,

    loaderColor: PropTypes.string,
    permissionDialogTitle: PropTypes.string,
    permissionDialogMessage: PropTypes.string,
    pendingAuthorizedView: PropTypes.oneOfType([
      PropTypes.node,
      // PropTypes.func
    ]),
    notAuthorizedView: PropTypes.oneOfType([
      PropTypes.node,
      // PropTypes.func
    ]),

    setMainState: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired,
    loadingMore: PropTypes.bool.isRequired,
    noMore: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      lastCursor: null,
      permissionGranted: !this.props.enableCameraRoll
        ? "granted" : Platform.OS === "ios"
        ? "granted" : "denied",
      initialLoading: true,
    };
  }

  componentDidMount = async () => {
    if (this.props.enableCameraRoll) {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            "title": this.props.permissionDialogTitle,
            "message": this.props.permissionDialogMessage
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.setState({
            permissionGranted: "granted"
          });
          this.fetch();
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          this.setState({
            permissionGranted: "denied"
          });
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          this.setState({
            permissionGranted: "never_ask_again"
          });
        }
      }
      if (Platform.OS === "ios") {
        this.fetch();
      }
    } else {
      this.fetch();
    }
  }

  fetch = (ref = false) => {
    if (!this.props.loadingMore) {
      this.props.setMainState({ loadingMore: true });
      this._fetch(ref);
    }
  }

  _fetch = (ref = false) => {
    var {
      totalCount,
      itemCount,
      groupTypes,
      assetType,
      catchGetPhotosError
    } = this.props;

    var fetchParams = {
      first: totalCount + itemCount,
      groupTypes: groupTypes,
      assetType: assetType,
    };

    if (Platform.OS === "android") {
      // not supported in android
      delete fetchParams.groupTypes;
    }

    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor;
    }

    if (this.props.enableCameraRoll) {
      var CameraRoll;
      if (parseFloat(require("react-native/package.json").version) >= 0.6) {
        CameraRoll = require("@react-native-community/cameraroll");
      } else {
        CameraRoll = require("react-native").CameraRoll;
      }
      CameraRoll.getPhotos(fetchParams)
        .then((data) => this._appendImages(data, ref))
        .catch((e) => {
          catchGetPhotosError &&
            catchGetPhotosError(e);
        });
    } else {
      this._appendRemoteImages({
        previousCount: totalCount,
        itemCount: fetchParams.first,
        groupTypes: fetchParams.groupTypes,
        assetType: fetchParams.assetType
      });
    }
  }

  _appendImages = (data, ref = false) => {
    var { totalCount, itemCount } = this.props;
    var assets = data.edges;

    var newMainState = {
      totalCount: totalCount + itemCount,
      loadingMore: false,
    };

    var newState = {
      initialLoading: false,
    };

    if (assets.length > 0) {
      var extractedData = assets.map((asset, index) => {
        return {
          index: index,
          id: Math.random().toString(36).substring(7),
          source: {
            uri: asset.node.image.uri
          },
          dimensions: {
            width: asset.node.image.width,
            height: asset.node.image.height
          },
          ...asset.node,
          ...asset.node.image
        };
      });
      newState.lastCursor = data.page_info.end_cursor;
      this.props.setMainState({ resolvedData: extractedData });
    }

    if (!data.page_info.has_next_page) {
      newMainState.noMore = true;
    }

    this.props.setMainState(newMainState);
    if (!ref) {
      this.setState(newState);
    }
  }

  _appendRemoteImages = async (fetchParams, ref = false) => {
    var { totalCount, itemCount } = this.props;
    var data;

    var newMainState = {
      totalCount: totalCount + itemCount,
      loadingMore: false,
    };

    var newState = {
      initialLoading: false,
    };

    if (this.props.onGetData) {
      data = await new Promise((resolve) => {
          this.props.onGetData(fetchParams, resolve);
      });
    }

    if (typeof data === "object") {
      var assets = data.assets;

      if (assets && assets.length > 0) {
        var extractedData = assets
          .filter((asset) => findUri(asset) ? true : false)
          .map((asset, index) => {
            const source = findUri(asset) ? findUri(asset) : "";
            if (source) {
              return {
                index: index,
                id: Math.random().toString(36).substring(7),
                ...asset,
                source: source,
                uri: source.uri
              };
            }
          });

        this.props.setMainState({ resolvedData: extractedData });
      }
    }

    if (
      !data.pageInfo
      || (data.pageInfo && !data.pageInfo.hasNextPage)
    ) {
      newMainState.noMore = true;
    }

    this.props.setMainState(newMainState);
    if (!ref) {
      this.setState(newState);
    }
  }

  render() {
    var {
      images,
      imagesPerRow,
      initialNumToRender,
      removeClippedSubviews,
      cameraRollFlatListProps,
      backgroundColor,
      emptyText,
      emptyTextStyle,
      loader,
      loaderColor,
      pendingAuthorizedView,
      notAuthorizedView,
    } = this.props;

    if (this.state.permissionGranted === "denied") {
      this._renderData([{
        customElement: pendingAuthorizedView,
        text: "Waiting on access permission to camera roll.",
      }]);
    }

    if (this.state.permissionGranted === "never_ask_again") {
      this._renderData([{
        customElement: notAuthorizedView,
        text: "Access denied to camera roll.",
      }]);
    }

    if (this.state.initialLoading) {
      return (
        <View style={[styles.loader, {backgroundColor}]}>
          { loader || <ActivityIndicator size="large" color={loaderColor} style={styles.spinner} /> }
        </View>
      );
    }

    var flatListOrEmptyText = images.length > 0
      ? <FlatList
          style={{flex: 1}}
          numColumns={imagesPerRow}
          initialNumToRender={initialNumToRender}
          removeClippedSubviews={removeClippedSubviews}
          ListHeaderComponent={this.props.cameraRollListHeader}
          ListFooterComponent={this.props.cameraRollListFooter}
          onEndReached={() => {
            this._onEndReached();
            this.props.onEndReached &&
              this.props.onEndReached();
          }}
          onEndReachedThreshold={this.props.onEndReachedThreshold}
          {...cameraRollFlatListProps}
          data={images}
          renderItem={this._renderImage}
          keyExtractor={(item, index) => item.id + index.toString()}
        />
      : this._renderData([{
        text: emptyText,
        textStyle: emptyTextStyle,
      }]);

    return (
      <View
        style={[styles.wrapper, {paddingRight: 0, backgroundColor: backgroundColor},]}>
        {flatListOrEmptyText}
      </View>
    );
  }

  _renderData = (data) => {
    return (
      <FlatList
        style={[styles.error, { backgroundColor: this.props.backgroundColor}]}
        ListHeaderComponent={this.props.cameraRollListHeader}
        ListFooterComponent={this.props.cameraRollListFooter}
        data={data}
        renderItem={this._renderError}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  _renderImage = ({ item, index }) => {
    var {
      displayImageViewer,
      displayedImageId,
      imageMargin,
      imagesPerRow,
      containerWidth,
      imageContainerStyle,
      renderIndividualHeader,
      renderIndividualFooter,
      openImageViewer
    } = this.props;

    return (
      <ImageCell
        key={item.uri}
        index={index}
        data={item}
				imageId={item.id}
				source={{ uri: item.uri }}
				shouldHideDisplayedImage={
					displayImageViewer
					&& displayedImageId === item.id
				}
        imageMargin={imageMargin}
        imagesPerRow={imagesPerRow}
        containerWidth={containerWidth}

        imageContainerStyle={imageContainerStyle}
        renderIndividualHeader={renderIndividualHeader}
        renderIndividualFooter={renderIndividualFooter}

        onPressImage={openImageViewer}
      />
    );
  }

  _renderError = ({ item }) => {
    const {
      customElement,
      textStyle,
      text,
    } = item;

    return (
      customElement ||
      <Text style={[{textAlign: "center"}, textStyle]}>{text}</Text>
    );
  }

  _onEndReached = () => {
    if (!this.props.noMore) {
      this.fetch();
    }
  }

}

const styles = StyleSheet.create({
  wrapper:{
    flexGrow: 1
  },
  loader: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    flexGrow: 1,
  }
});
