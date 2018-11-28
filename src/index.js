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

export default class CameraRollGallery extends React.Component {
  _imageMeasurers: { [imageId: string]: () => void }
  _imageSizeMeasurers: { [imageId: string]: () => void }

  static propTypes = {
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

    imagePageComponent: PropTypes.func,
    errorPageComponent: PropTypes.func,
    pagesFlatListProps: PropTypes.object,
    pageMargin: PropTypes.number,
    onPageSelected: PropTypes.func,
    onPageScrollStateChanged: PropTypes.func,
    onPageScroll: PropTypes.func,
    pageScrollViewStyle: PropTypes.object,
    onPageSingleTapConfirmed: PropTypes.func,
    onPageLongPress: PropTypes.func,
    renderPageHeader: PropTypes.func,
    renderPageFooter: PropTypes.func,
  }

  static defaultProps = {
    imagesPerRow: 3,
    initialNumToRender: 6,
    removeClippedSubviews: true,
    groupTypes: "SavedPhotos",
    assetType: "Photos",
    imageMargin: 5,
    backgroundColor: "white",
    emptyText: "No photos.",
    imageContainerStyle: {},
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
      imageId: undefined
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

  _findMediaIndex = (uri) => {
		return this.state.resolvedData.findIndex(
			(data) => data.uri.toLowerCase() === uri.toLowerCase()
		);
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

  render() {
    return (
      <View style={styles.container} {...this.props}>
        <CameraRollBrowser
          images={this.state.resolvedData}
          imagesPerRow={this.props.imagesPerRow}
          initialNumToRender={this.props.initialNumToRender}
          removeClippedSubviews={this.props.removeClippedSubviews}
          cameraRollFlatListProps={this.props.cameraRollFlatListProps}
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

          openImageViewer={this.openImageViewer}
          displayImageViewer={this.state.displayImageViewer}
          displayedImageId={this.state.imageId}
          findMediaIndex={this._findMediaIndex}
          setMediaData={this._setMediaData}
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
                  onPageSelected={this.props.onPageSelected}
                  onPageScrollStateChanged={this.props.onPageScrollStateChanged}
                  onPageScroll={this.props.onPageScroll}
                  pageScrollViewStyle={this.props.pageScrollViewStyle}
                  onPageSingleTapConfirmed={this.props.onPageSingleTapConfirmed}
                  onPageLongPress={this.props.onPageLongPress}
                  renderPageHeader={this.props.renderPageHeader}
                  renderPageFooter={this.props.renderPageFooter}
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
