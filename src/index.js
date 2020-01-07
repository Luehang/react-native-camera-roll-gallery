import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  Modal,
  Platform,
  StyleSheet,
  SafeAreaView,
  View
} from "react-native";
import CameraRollBrowser from "./CameraRollBrowser";
import ImageViewer from "./ImageViewer";

export default class CameraRollGallery extends React.PureComponent {
  _imageMeasurers: { [imageId: string]: () => void }
  _imageSizeMeasurers: { [imageId: string]: () => void }

  static propTypes = {
    enableCameraRoll: PropTypes.bool,
    onGetData: PropTypes.func,
    itemCount: PropTypes.number,
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

    imagePageComponent: PropTypes.func,
    errorPageComponent: PropTypes.func,
    pagesFlatListProps: PropTypes.object,
    pageMargin: PropTypes.number,
    sensitivePageScroll: PropTypes.bool,
    onPageSelected: PropTypes.func,
    onPageScrollStateChanged: PropTypes.func,
    onPageScroll: PropTypes.func,
    pageScrollViewStyle: PropTypes.object,
    onPageSingleTapConfirmed: PropTypes.func,
    onPageLongPress: PropTypes.func,
    renderPageHeader: PropTypes.func,
    renderPageFooter: PropTypes.func,

    onDoubleTapConfirmed: PropTypes.func,
    onDoubleTapStartReached: PropTypes.func,
    onDoubleTapEndReached: PropTypes.func,
    onPinchTransforming: PropTypes.func,
    onPinchStartReached: PropTypes.func,
    onPinchEndReached: PropTypes.func,
    enableScale: PropTypes.bool,
    enableTranslate: PropTypes.bool,
    resizeMode: PropTypes.string,
    enableResistance: PropTypes.bool,
    resistantStrHorizontal: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string
    ]),
    resistantStrVertical: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string
    ]),
    onViewTransformed: PropTypes.func,
    onTransformGestureReleased: PropTypes.func,
    maxScale: PropTypes.bool,
    maxOverScrollDistance: PropTypes.number,
    enableVerticalExit: PropTypes.bool,
    onEndReached: PropTypes.func,
    onEndReachedThreshold: PropTypes.number
  }

  static defaultProps = {
    enableCameraRoll: true,
    itemCount: 200,
    imagesPerRow: 3,
    initialNumToRender: 6,
    removeClippedSubviews: true,
    groupTypes: "All",
    assetType: "Photos",
    imageMargin: 5,
    backgroundColor: "white",
    emptyText: "No photos.",
    loaderColor: "lightblue",
    imageContainerStyle: {},
    sensitivePageScroll: false,
    enableVerticalExit: true,
    onEndReachedThreshold: 0.8,
    permissionDialogTitle: "Read Storage Permission",
    permissionDialogMessage: "Needs access to your photos " +
      "so you can use these awesome services.",
  }

  static childContextTypes = {
    onSourceContext: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      resolvedData: [],
      displayImageViewer: false,
      galleryInitialIndex: 0,
      galleryIndex: 0,
      imageId: undefined,
      loadingMore: false,
      noMore: false,
      totalCount: 0
    };
    this._imageMeasurers = {};
    this._imageSizeMeasurers = {};
  }

  getChildContext() {
    return { onSourceContext: this._onSourceContext };
  }

  _onSourceContext = (
    imageId,
    cellMeasurer,
    imageMeasurer
  ) => {
    this._imageMeasurers[imageId] = cellMeasurer;
    this._imageSizeMeasurers[imageId] = imageMeasurer;
  }

  _getSourceContext = (imageId) => {
    return {
      measurer: this._imageMeasurers[imageId],
      imageSizeMeasurer: this._imageSizeMeasurers[imageId]
    };
  }

  _setMediaData = (data) => {
    this.setState({ resolvedData: data });
  }

  openImageViewer = async (imageId, index) => {
    await this.setState({ displayImageViewer: true, imageId, galleryInitialIndex: index });
  }

  closeImageViewer = () => {
    this.setState({ displayImageViewer: false, imageId: undefined });
  }

  onChangePhoto = (imageId, galleryIndex) => {
    this.setState({
      imageId,
      galleryIndex
    });
  }

  getMoreData = () => {
    if (!this.state.noMore) {
      this._cameraRollBrowser.fetch(true);
    }
  }

  setLoadingMore = (bool) => {
    this.setState({ loadingMore: bool });
  }

  setNoMore = (bool) => {
    this.setState({ noMore: bool });
  }

  setMainState = (newState) => {
    this.setState(newState);
  }

  render() {
    return (
      <View style={styles.container} {...this.props}>
        <CameraRollBrowser
          ref={(component) => {
            this._cameraRollBrowser = component;
          }}
          enableCameraRoll={this.props.enableCameraRoll}
          onGetData={this.props.onGetData}
          itemCount={this.props.itemCount}
          images={this.state.resolvedData}
          imagesPerRow={this.props.imagesPerRow}
          initialNumToRender={this.props.initialNumToRender}
          removeClippedSubviews={this.props.removeClippedSubviews}
          cameraRollFlatListProps={this.props.cameraRollFlatListProps}
          catchGetPhotosError={this.props.catchGetPhotosError}
          groupTypes={this.props.groupTypes}
          assetType={this.props.assetType}
          imageMargin={this.props.imageMargin}
          containerWidth={this.props.containerWidth}
          backgroundColor={this.props.backgroundColor}
          emptyText={this.props.emptyText}
          emptyTextStyle={this.props.emptyTextStyle}
          loader={this.props.loader}
          cameraRollListHeader={this.props.cameraRollListHeader}
          cameraRollListFooter={this.props.cameraRollListFooter}
          imageContainerStyle={this.props.imageContainerStyle}
          renderIndividualHeader={this.props.renderIndividualHeader}
          renderIndividualFooter={this.props.renderIndividualFooter}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={this.props.onEndReachedThreshold}

          openImageViewer={this.openImageViewer}
          displayImageViewer={this.state.displayImageViewer}
          displayedImageId={this.state.imageId}
          setMediaData={this._setMediaData}

          loaderColor={this.props.loaderColor}
          permissionDialogTitle={this.props.permissionDialogTitle}
          permissionDialogMessage={this.props.permissionDialogMessage}
          pendingAuthorizedView={this.props.pendingAuthorizedView}
          notAuthorizedView={this.props.notAuthorizedView}

          setMainState={this.setMainState}
          totalCount={this.state.totalCount}
          setLoadingMore={this.setLoadingMore}
          setNoMore={this.setNoMore}
          loadingMore={this.state.loadingMore}
          noMore={this.state.noMore}
        />
        {this.state.displayImageViewer &&
          this.state.imageId &&
          (
            <SafeAreaView>
              <Modal
                visible={this.state.displayImageViewer &&
                  this.state.imageId ? true : false}
                transparent={true}
                animationType={Platform.OS === "ios" ? "none" : "fade"}
                onRequestClose={this.closeImageViewer}>
                  <ImageViewer
                    images={this.state.resolvedData}
                    imageId={this.state.imageId}
                    galleryInitialIndex={this.state.galleryInitialIndex}
                    galleryIndex={this.state.galleryIndex}
                    onClose={this.closeImageViewer}
                    onChangePhoto={this.onChangePhoto}
                    getSourceContext={this._getSourceContext}
                    displayImageViewer={this.state.displayImageViewer}

                    imagePageComponent={this.props.imagePageComponent}
                    errorPageComponent={this.props.errorPageComponent}
                    pagesFlatListProps={this.props.pagesFlatListProps}
                    pageMargin={this.props.pageMargin}
                    sensitivePageScroll={this.props.sensitivePageScroll}
                    onPageSelected={this.props.onPageSelected}
                    onPageScrollStateChanged={this.props.onPageScrollStateChanged}
                    onPageScroll={this.props.onPageScroll}
                    pageScrollViewStyle={this.props.pageScrollViewStyle}
                    onPageSingleTapConfirmed={this.props.onPageSingleTapConfirmed}
                    onPageLongPress={this.props.onPageLongPress}
                    renderPageHeader={this.props.renderPageHeader}
                    renderPageFooter={this.props.renderPageFooter}

                    onDoubleTapConfirmed={this.props.onDoubleTapConfirmed}
                    onDoubleTapStartReached={this.props.onDoubleTapStartReached}
                    onDoubleTapEndReached={this.props.onDoubleTapEndReached}
                    onPinchTransforming={this.props.onPinchTransforming}
                    onPinchStartReached={this.props.onPinchStartReached}
                    onPinchEndReached={this.props.onPinchEndReached}
                    enableScale={this.props.enableScale}
                    enableTranslate={this.props.enableTranslate}
                    resizeMode={this.props.resizeMode}
                    enableResistance={this.props.enableResistance}
                    resistantStrHorizontal={this.props.resistantStrHorizontal}
                    resistantStrVertical={this.props.resistantStrVertical}
                    onViewTransformed={this.props.onViewTransformed}
                    onTransformGestureReleased={this.props.onTransformGestureReleased}
                    maxScale={this.props.maxScale}
                    maxOverScrollDistance={this.props.maxOverScrollDistance}
                    enableVerticalExit={this.props.enableVerticalExit}

                    getMoreData={this.getMoreData}
                    onEndReached={this.props.onEndReached}
                    onEndReachedThreshold={this.props.onEndReachedThreshold}
                  />
              </Modal>
            </SafeAreaView>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
