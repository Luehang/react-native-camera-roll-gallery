import React from "react";
import {
  PermissionsAndroid,
  CameraRoll,
  Platform,
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";

import ImageCell from "./ImageCell";

export default class CameraRollBrowser extends React.Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    imagesPerRow: PropTypes.number,
    initialNumToRender: PropTypes.number,
    removeClippedSubviews: PropTypes.bool,
    cameraRollFlatListProps: PropTypes.object,
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

    openImageViewer: PropTypes.func.isRequired,
		displayImageViewer: PropTypes.bool.isRequired,
		displayedImageId: PropTypes.string,
		findMediaIndex: PropTypes.func.isRequired,
		setMediaData: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      lastCursor: null,
      initialLoading: true,
      loadingMore: false,
      noMore: false,
    };
  }

  componentWillMount = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          "title": "Read Storage Permission",
          "message": "Needs access to your photos " +
            "so you can use these awesome services."
        }
      );
    }
    this.fetch();
  }

  fetch = () => {
    if (!this.state.loadingMore) {
      this.setState({loadingMore: true}, () => { this._fetch(); });
    }
  }

  _fetch = () => {
    var {groupTypes, assetType} = this.props;

    var fetchParams = {
      first: 1000,
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

    CameraRoll.getPhotos(fetchParams)
      // eslint-disable-next-line no-console
      .then((data) => this._appendImages(data), (e) => console.log(e));
  }

  _appendImages = (data) => {
    var assets = data.edges;

    var newState = {
      loadingMore: false,
      initialLoading: false,
    };

    if (!data.page_info.has_next_page) {
      newState.noMore = true;
    }

    if (assets.length > 0) {
      var extractedData = assets.map((asset) => {
        return {
          id: Math.random().toString(36).substr(2, 9),
          type: asset.node.type,
          group_name: asset.node.group_name,
          timestamp: asset.node.timestamp,
          ...asset.node.image
        };
      });
      newState.lastCursor = data.page_info.end_cursor;
      this.props.setMediaData(extractedData);
    }

    this.setState(newState);
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
    } = this.props;

    if (this.state.initialLoading) {
      return (
        <View style={[styles.loader, {backgroundColor}]}>
          { loader || <ActivityIndicator size="large" color="#e53935" style={styles.spinner} /> }
        </View>
      );
    }

    var flatListOrEmptyText = images.length > 0 ? (
      <FlatList
        style={{flex: 1}}
        numColumns={imagesPerRow}
        initialNumToRender={initialNumToRender}
        removeClippedSubviews={removeClippedSubviews}
        ListHeaderComponent={this.props.cameraRollListHeader}
        ListFooterComponent={this.props.cameraRollListFooter}
        onEndReached={this._onEndReached}
        {...cameraRollFlatListProps}
        data={images}
        renderItem={this._renderImage}
        keyExtractor={(item, index) => item.id + index.toString()}
      />
    ) : (
      <FlatList
        style={{flex: 1}}
        ListHeaderComponent={this.props.cameraRollListHeader}
        ListFooterComponent={this.props.cameraRollListFooter}
        data={[{
          emptyText,
          emptyTextStyle
        }]}
        renderItem={this._renderError}
        keyExtractor={(item, index) => item.id + index.toString()}
      />
    );

    return (
      <View
        style={[styles.wrapper, {paddingRight: 0, backgroundColor: backgroundColor},]}>
        {flatListOrEmptyText}
      </View>
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
      openImageViewer,
      findMediaIndex
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
        findMediaIndex={findMediaIndex}
      />
    );
  }

  _renderError = ({ item }) => {
    return (
      <Text style={[{textAlign: "center"}, item.emptyTextStyle]}>{item.emptyText}</Text>
    );
  }

  _onEndReached = () => {
    if (!this.state.noMore) {
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
});
