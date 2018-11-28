import React from "react";
import {
	Easing,
	Animated,
	TouchableOpacity,
	Dimensions
} from "react-native";
import PropTypes from "prop-types";

export default class ImageCell extends React.Component {
	_imageRef;
	_readyToMeasure;

	static propTypes = {
		data: PropTypes.object.isRequired,
		index: PropTypes.number.isRequired,
		imageId: PropTypes.string.isRequired,
		source: PropTypes.any.isRequired,
		shouldHideDisplayedImage: PropTypes.bool.isRequired,

		imageMargin: PropTypes.number.isRequired,
		imagesPerRow: PropTypes.number.isRequired,
		containerWidth: PropTypes.number,

		imageContainerStyle: PropTypes.object,
		renderIndividualHeader: PropTypes.func,
		renderIndividualFooter: PropTypes.func,

		onPressImage: PropTypes.func.isRequired,
		findMediaIndex: PropTypes.func.isRequired,
	}

	static contextTypes = {
		onSourceContext: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			opacity: new Animated.Value(1),
			imageLoaded: false
		};
		this._readyToMeasure = false;
	}

	componentWillMount() {
		var { width } = Dimensions.get("window");
		var { imageMargin, imagesPerRow, containerWidth } = this.props;

		if (typeof containerWidth !== "undefined") {
			width = containerWidth;
		}
		this._imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;

		this.context.onSourceContext(
			this.props.imageId,
			this.measurePhoto,
			this.measureImageSize
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.props.shouldHideDisplayedImage !== nextProps.shouldHideDisplayedImage ||
			this.state.imageLoaded !== nextState.imageLoaded
		) {
			return true;
		}
		return false;
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.imageLoaded === false && this.state.imageLoaded) {
			Animated.timing(this.state.opacity, {
				toValue: 1,
				duration: 300,
				easing: Easing.inOut(Easing.ease)
			}).start();
		} else {
			if (this.props.shouldHideDisplayedImage) {
				this.state.opacity.setValue(0);
			} else {
				this.state.opacity.setValue(1);
			}
		}
	}

	measurePhoto = async () => {
		if (!this._imageRef || !this._readyToMeasure) {
			/* eslint-disable no-console */
			console.warn("measurePhoto: Trying to measure image without ref or layout");
		}
		return new Promise((resolve, reject) => {
			this._imageRef
				.getNode()
				.measure(
					(
						imgX,
						imgY,
						imgWidth,
						imgHeight,
						imgPageX,
						imgPageY
					) => {
						resolve({
							width: imgWidth,
							height: imgHeight,
							x: imgPageX,
							y: imgPageY + this.props.imageMargin
						});
					},
					reject
				);
		});
	}

	measureImageSize = () => {
		if (!this.state.imageLoaded) {
			/* eslint-disable no-console */
			console.warn("measureImageSize: Undefined image size");
		}
		return { width: this.props.data.width, height: this.props.data.height };
	}

	_onPressImage = async (uri) => {
		// Wait for the image to load before reacting to press events
		if (this.state.imageLoaded) {
			const index = await this.props.findMediaIndex(uri);
			this.props.onPressImage(this.props.imageId, index);
		}
	}

	render() {
		const {
			data, index, imageId, source, imageMargin, imagesPerRow,
			imageContainerStyle, renderIndividualHeader,
			renderIndividualFooter, findMediaIndex
		} = this.props;
		const header = (renderIndividualHeader)
			? renderIndividualHeader(data, findMediaIndex(data.uri))
			: null;
		const footer = (renderIndividualFooter)
			? renderIndividualFooter(data, findMediaIndex(data.uri))
			: null;
		return (
			<TouchableOpacity
				key={imageId}
				style={{
					marginTop: imageMargin,
					marginLeft: index === 0 || index % imagesPerRow === 0
						? imageMargin : imageMargin / 2,
					marginRight: (index + 1) % imagesPerRow === 0
						? imageMargin : imageMargin / 2
				}}
				onPress={() => this._onPressImage(source.uri)}
			>
				{header}
				<Animated.Image
					ref={(ref) => {
						this._imageRef = ref;
					}}
					onLayout={() => {
						this._readyToMeasure = true;
					}}
					onLoad={() => {
						this.setState({ imageLoaded: true });
					}}
					source={source}
					resizeMode="cover"
					style={[
						{
							height: this._imageSize,
							width: this._imageSize,
							backgroundColor: "lightgrey",
							...imageContainerStyle
						},
						{ opacity: this.state.opacity }
					]}
				/>
				{footer}
			</TouchableOpacity>
		);
	}
}
