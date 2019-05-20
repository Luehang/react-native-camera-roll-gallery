import React from "react";
import { Easing, Platform, Animated, Image, StyleSheet, Dimensions } from "react-native";
import GallerySwiper from "react-native-gallery-swiper";
import SmartGallery from "react-native-smart-gallery";
import PropTypes from "prop-types";
import ViewerBackground from "./ViewerBackground";
import ScrollSpacerView from "./ScrollSpacerView";
import ImageTransitionView from "./ImageTransitionView";
import Header from "./Header";
import Footer from "./Footer";

import type { ImageMeasurements } from "./Utils";

export default class ImageViewer extends React.PureComponent {
  static propTypes = {
    images: PropTypes.array.isRequired,
    imageId: PropTypes.string.isRequired,
    galleryInitialIndex: PropTypes.number.isRequired,
    galleryIndex: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    onChangePhoto: PropTypes.func.isRequired,
    getSourceContext: PropTypes.func.isRequired,
    displayImageViewer: PropTypes.bool.isRequired,

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
  }

  constructor(props) {
    super(props);
    this.state = {
      width: new Animated.Value(Dimensions.get("window").width),
      height: new Animated.Value(Dimensions.get("window").height),
      openProgress: new Animated.Value(0),
      dismissProgress: null,
      dismissScrollProgress: new Animated.Value(Dimensions.get("window").height),
      initialImageMeasurements: null,
      openImageMeasurements: null,
      closeScrollEnabled: true
    };
  }

  componentDidMount() {
    this._measurePhotoSize();
  }

  componentWillReceiveProps(nextProps) {
    // Measure photo on horizontal scroll change
    if (this.props.imageId !== nextProps.imageId) {
      // TOOD: add opacity effect
      this.setState(
        {
          initialImageMeasurements: null,
          openImageMeasurements: null
        },
        () => this._measurePhotoSize()
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.openProgress &&
      Animated.timing(this.state.openProgress, {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.poly(3)),
        useNativeDriver: true
      }).start(() => this.setState({ openProgress: null }));
  }

  _getTransitionProgress = () => {
    const gestureDismissProgress =
      this.state.dismissScrollProgress &&
      Platform.OS === "ios" &&
      this.state.dismissScrollProgress.interpolate({
        inputRange: [
          0,
          this.state.height.__getValue(),
          this.state.height.__getValue() * 2
        ],
        outputRange: [0.02, 1, 0.02]
      });
    return (
      this.state.openProgress || gestureDismissProgress || new Animated.Value(1)
    );
  }

  _measurePhotoSize = async () => {
    const { measurer, imageSizeMeasurer } = this.props.getSourceContext(
      this.props.imageId
    );
    const imageSize: {
      width: number,
      height: number
    } = await imageSizeMeasurer();
    const imageAspectRatio: number = imageSize.width / imageSize.height;
    const height: number = this.state.height.__getValue();
    const width: number = this.state.width.__getValue();
    const screenAspectRatio: number = width / height;
    let finalWidth: number = width;
    let finalHeight: number = width / imageAspectRatio;
    if (imageAspectRatio - screenAspectRatio < 0) {
      finalHeight = height;
      finalWidth = height * imageAspectRatio;
    }
    const finalX: number = (width - finalWidth) / 2;
    const finalY: number = (height - finalHeight) / 2;
    const openImageMeasurements: ImageMeasurements = {
      width: finalWidth,
      height: finalHeight,
      x: finalX,
      y: finalY,
      scale: finalWidth / width
    };
    // Measure initial photo size
    const initialImageMeasurements: ImageMeasurements = await measurer();
    this.setState({
      initialImageMeasurements,
      openImageMeasurements
    });
  }

  _handleRef = (ref: any) => {
    if (ref) {
      // Hack to enable scroll when the ref callback is called
      setTimeout(() => {
        ref &&
          ref.getNode().scrollResponderScrollTo({
            y: this.state.height.__getValue(),
            animated: false
          });
      }, 0);
    }
  }

  _onScroll = (e: Object) => {
    const yOffset = e.nativeEvent.contentOffset.y;
    const heightValue = this.state.height.__getValue();
    if (yOffset <= 50 || yOffset >= 2 * heightValue - 50) {
      this.props.onClose();
    }
  }

  _renderIOSVerticalScrollView(
    width: Animated.Value,
    height: Animated.Value,
    openImageMeasurements: ?ImageMeasurements,
    transitionProgress: any
  ) {
    const { renderPageHeader, renderPageFooter, images, galleryIndex, onClose } = this.props;
    return (
      <Animated.ScrollView
        ref={this._handleRef}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: this.state.dismissScrollProgress }
              }
            }
          ],
          { useNativeDriver: true, listener: this._onScroll }
        )}
        scrollEventThrottle={1}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        scrollEnabled={this.state.closeScrollEnabled}
      >
        <ScrollSpacerView width={width} height={height} />
        <Animated.View
          style={{
            width: width.__getValue(),
            height: height.__getValue(),
            flexDirection: "row",
            alignItems: "center",
            opacity: transitionProgress.interpolate({
              inputRange: [0.998, 0.999],
              outputRange: [0, 1]
            })
          }}
        >
          {
            renderPageHeader &&
            <Header
              renderPageHeader={renderPageHeader}
              images={images}
              galleryIndex={galleryIndex}
              onClose={onClose}
            />
          }
          <GallerySwiper
            style={{ flex: 1, backgroundColor: "transparent" }}
            images={images}
            initialPage={this.props.galleryInitialIndex}
            initialNumToRender={this.props.images.length}
            errorComponent={this.props.errorPageComponent}
            flatListProps={this.props.pagesFlatListProps}
            sensitivePageScroll={this.props.sensitivePageScroll}
            pageMargin={this.props.pageMargin}
            onPageScrollStateChanged={this.props.onPageScrollStateChanged}
            onPageScroll={this.props.onPageScroll}
            scrollViewStyle={this.props.pageScrollViewStyle}
            onSingleTapConfirmed={this.props.onPageSingleTapConfirmed}
            onLongPress={this.props.onPageLongPress}
            openImageMeasurements={openImageMeasurements}
            imageComponent={(imageProps, imageDimensions, index) => {
              if (!this.props.imagePageComponent) {
                return <Image {...imageProps} />;
              } else {
                return this.props.imagePageComponent(imageProps, imageDimensions, index);
              }
            }}
            onPageSelected={(index) => {
              this.props.onChangePhoto(this.props.images[index].id, index);
              if (index !== this.props.galleryInitialIndex) {
                this.setState(
                  {
                    initialImageMeasurements: null,
                    openImageMeasurements: null
                  }
                );
              }
              this.props.onPageSelected &&
                this.props.onPageSelected(index);
            }}
            onPinchTransforming={(transform, i) => {
              if (transform.scale > 1 && this.state.closeScrollEnabled) {
                this.setState({
                  closeScrollEnabled: false
                });
              }
              if (this.props.onPinchTransforming) {
                this.props.onPinchTransforming(transform, i);
              }
            }}
            onPinchStartReached={(transform, i) => {
              if (!this.state.closeScrollEnabled) {
                this.setState({
                  closeScrollEnabled: true
                });
              }
              if (this.props.onPinchStartReached) {
                this.props.onPinchStartReached(transform, i);
              }
            }}
            onDoubleTapStartReached={(transform, i) => {
              if (!this.state.closeScrollEnabled) {
                this.setState({
                  closeScrollEnabled: true
                });
              }
              if (this.props.onDoubleTapStartReached) {
                this.props.onDoubleTapStartReached(transform, i);
              }
            }}
            onDoubleTapEndReached={(transform, i) => {
              if (this.state.closeScrollEnabled) {
                return this.setState({
                  closeScrollEnabled: false
                });
              }
              if (this.props.onDoubleTapEndReached) {
                this.props.onDoubleTapEndReached(transform, i);
              }
            }}
            onDoubleTapConfirmed={this.props.onDoubleTapConfirmed}
            onPinchEndReach={this.props.onPinchEndReach}
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
          />
          {
            renderPageFooter &&
            <Footer
              renderPageFooter={renderPageFooter}
              images={images}
              galleryIndex={galleryIndex}
              onClose={onClose}
            />
          }
        </Animated.View>
        <ScrollSpacerView width={width} height={height} />
      </Animated.ScrollView>
    );
  }

  _renderAndroidVerticalView(
    width: Animated.Value,
    height: Animated.Value,
    transitionProgress: any
  ) {
    const { renderPageHeader, renderPageFooter, images, galleryIndex, onClose } = this.props;
    return (
      <Animated.View
        style={{
          width: width.__getValue(),
          height: height.__getValue(),
          flexDirection: "row",
          alignItems: "center",
          opacity: transitionProgress.interpolate({
            inputRange: [0.998, 0.999],
            outputRange: [0, 1]
          })
        }}
      >
        {
          renderPageHeader &&
          <Header
            renderPageHeader={renderPageHeader}
            images={images}
            galleryIndex={galleryIndex}
            onClose={onClose}
          />
        }
        <SmartGallery
          images={images}
          index={this.props.galleryInitialIndex}
          errorComponent={this.props.errorPageComponent}
          pageMargin={this.props.pageMargin}
          sensitiveScroll={this.props.sensitivePageScroll}
          onPageScrollStateChanged={this.props.onPageScrollStateChanged}
          onPageScroll={this.props.onPageScroll}
          scrollViewStyle={this.props.pageScrollViewStyle}
          onSingleTapConfirmed={this.props.onPageSingleTapConfirmed}
          onLongPress={this.props.onPageLongPress}
          renderItem={(imageProps, imageDimensions, index) => {
            if (!this.props.imagePageComponent) {
              return <Image {...imageProps} />;
            } else {
              return this.props.imagePageComponent(imageProps, imageDimensions, index);
            }
          }}
          onPageSelected={(index) => {
            this.props.onChangePhoto(images[index].id, index);
            if (index !== this.props.galleryInitialIndex) {
              this.setState(
                {
                  initialImageMeasurements: null,
                  openImageMeasurements: null
                }
              );
            }
            this.props.onPageSelected &&
              this.props.onPageSelected(index);
          }}
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
        />
        {
          renderPageFooter &&
          <Footer
            renderPageFooter={renderPageFooter}
            images={images}
            galleryIndex={galleryIndex}
            onClose={onClose}
          />
        }
      </Animated.View>
    );
  }

  render() {
    const {
      width,
      height,
      openProgress,
      openImageMeasurements,
      initialImageMeasurements
    } = this.state;
    const imageSource = this.props.images[this.props.galleryIndex];
    const transitionProgress: any = this._getTransitionProgress();
    if (Platform.OS === "ios") {
      return (
        <Animated.View
          style={styles.topContainer}
          onLayout={Animated.event([
            { nativeEvent: { layout: { width, height } } }
          ])}
        >
          <Animated.View
            style={[styles.topContainer, { opacity: openProgress || 1 }]}
          >
            <ViewerBackground
              opacityProgress={this.state.dismissScrollProgress}
              inputRange={[0, height.__getValue(), height.__getValue() * 2]}
              outputRange={[0.02, 1, 0.02]}
            />
            {this._renderIOSVerticalScrollView(
              width,
              height,
              openImageMeasurements,
              transitionProgress
            )}
          </Animated.View>
          {initialImageMeasurements &&
            openImageMeasurements &&
            (
              <ImageTransitionView
                source={{ uri: imageSource && imageSource.uri }}
                transitionProgress={transitionProgress}
                dismissScrollProgress={this.state.dismissScrollProgress}
                initialImageMeasurements={initialImageMeasurements}
                openImageMeasurements={openImageMeasurements}
                imageWidth={imageSource.width}
                imageHeight={imageSource.height}
                width={width.__getValue()}
                height={height.__getValue()}
              />
            )}
        </Animated.View>
      );
    }
    return this._renderAndroidVerticalView(
      width,
      height,
      transitionProgress
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "transparent"
  }
});
