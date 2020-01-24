import React from "react";
import { Platform, Image, Dimensions, View } from "react-native";
import GallerySwiper from "react-native-gallery-swiper";
import SmartGallery from "react-native-smart-gallery";
import PropTypes from "prop-types";
import DefaultHeader from "./DefaultHeader";
import Header from "./Header";
import Footer from "./Footer";

export default class ImageViewer extends React.PureComponent {
  static propTypes = {
    images: PropTypes.array.isRequired,
    imageId: PropTypes.string.isRequired,
    galleryInitialIndex: PropTypes.number.isRequired,
    galleryIndex: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    onChangePhoto: PropTypes.func.isRequired,
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
    onSwipeUpReleased: PropTypes.func,
    onSwipeDownReleased: PropTypes.func,
    maxScale: PropTypes.bool,
    maxOverScrollDistance: PropTypes.number,
    enableVerticalExit: PropTypes.bool,
    enableModal: PropTypes.bool,
    onEndReached: PropTypes.func,
    onEndReachedThreshold: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    };

    Dimensions.addEventListener("change", this.getLayoutSize);

    let { width, height } = Dimensions.get("window");
    const { containerWidth } = this.props;

    if (typeof containerWidth !== "undefined") {
      width = containerWidth;
    }

    this.state.width = width;
    this.state.height = height;
  }

  componentDidMount() {
    Dimensions.addEventListener("change", this.getLayoutSize);
	}

  getLayoutSize = () => {
    let { width, height } = Dimensions.get("window");
    const { containerWidth } = this.props;

    if (typeof containerWidth !== "undefined") {
      width = containerWidth;
    }

    this.setState({
      width,
      height
    });
  }

  _handleVerticalSwipe = (transform) => {
    const { scale, translateY: y } = transform;
		if (scale === 1 && (y < -150 || y > 150)) {
      this.props.onClose();
		}
	}

  _renderIOSVerticalScrollView(
    width,
    height
  ) {
    const {
      renderPageHeader, renderPageFooter, images,
      galleryIndex, onClose, enableModal
    } = this.props;
    return (
      <View style={{ width, height }}>
        {
          renderPageHeader
            ? <Header
              renderPageHeader={renderPageHeader}
              images={images}
              galleryIndex={galleryIndex}
              onClose={onClose}
            />
            : enableModal
              ? <DefaultHeader
                onClose={onClose}
              />
              : null
        }
        <GallerySwiper
          style={{ flex: 1, backgroundColor: "black" }}
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
          imageComponent={(imageProps, imageDimensions, index) => {
            if (!this.props.imagePageComponent) {
              return <Image {...imageProps} />;
            } else {
              return this.props.imagePageComponent(imageProps, imageDimensions, index);
            }
          }}
          onPageSelected={(index) => {
            this.props.onChangePhoto(this.props.images[index].id, index);
            this.props.onPageSelected &&
              this.props.onPageSelected(index);
          }}
          onPinchTransforming={(transform, i) => {
            if (this.props.onPinchTransforming) {
              this.props.onPinchTransforming(transform, i);
            }
          }}
          onPinchStartReached={(transform, i) => {
            if (this.props.onPinchStartReached) {
              this.props.onPinchStartReached(transform, i);
            }
          }}
          onDoubleTapStartReached={(transform, i) => {
            if (this.props.onDoubleTapStartReached) {
              this.props.onDoubleTapStartReached(transform, i);
            }
          }}
          onDoubleTapEndReached={(transform, i) => {
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
          onTransformGestureReleased={(transform, i) => {
            if (this.props.enableVerticalExit) {
              this._handleVerticalSwipe(transform);
            }
            if (this.props.onTransformGestureReleased) {
              this.props.onTransformGestureReleased(transform, i);
            }
          }}
          onSwipeUpReleased={(transform, i) => {
            this.props.onSwipeUpReleased &&
              this.props.onSwipeUpReleased(transform, i);
          }}
          onSwipeDownReleased={(transform, i) => {
            this.props.onSwipeDownReleased &&
              this.props.onSwipeDownReleased(transform, i);
          }}
          maxScale={this.props.maxScale}
          maxOverScrollDistance={this.props.maxOverScrollDistance}
          onEndReached={() => {
            this.props.getMoreData();
            this.props.onEndReached &&
              this.props.onEndReached();
          }}
          onEndReachedThreshold={this.props.onEndReachedThreshold}
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
      </View>
    );
  }

  _renderAndroidVerticalView(
    width,
    height
  ) {
    const {
      renderPageHeader, renderPageFooter, images,
      galleryIndex, onClose, enableModal
    } = this.props;
    return (
      <View style={{ width, height }}>
        {
          renderPageHeader
            ? <Header
              renderPageHeader={renderPageHeader}
              images={images}
              galleryIndex={galleryIndex}
              onClose={onClose}
            />
            : enableModal
              ? <DefaultHeader
                onClose={onClose}
              />
              : null
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
          onTransformGestureReleased={(transform, i) => {
            if (this.props.enableVerticalExit) {
              this._handleVerticalSwipe(transform);
            }
            if (this.props.onTransformGestureReleased) {
              this.props.onTransformGestureReleased(transform, i);
            }
          }}
          onSwipeUpReleased={(transform, i) => {
            this.props.onSwipeUpReleased &&
              this.props.onSwipeUpReleased(transform, i);
          }}
          onSwipeDownReleased={(transform, i) => {
            this.props.onSwipeDownReleased &&
              this.props.onSwipeDownReleased(transform, i);
          }}
          maxScale={this.props.maxScale}
          maxOverScrollDistance={this.props.maxOverScrollDistance}
          onEndReached={() => {
            this.props.getMoreData();
            this.props.onEndReached &&
              this.props.onEndReached();
          }}
          onEndReachedThreshold={this.props.onEndReachedThreshold}
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
      </View>
    );
  }

  componentWillUnmount() {
		Dimensions.removeEventListener("change", this.getLayoutSize);
	}

  render() {
    const {
      width,
      height
    } = this.state;
    if (Platform.OS === "ios") {
      return this._renderIOSVerticalScrollView(
        width,
        height
      );
    }
    return this._renderAndroidVerticalView(
      width,
      height
    );
  }
}
