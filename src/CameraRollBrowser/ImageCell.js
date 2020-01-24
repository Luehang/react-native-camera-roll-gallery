import React from "react";
import {
	Animated,
	TouchableOpacity,
	Dimensions
} from "react-native";
import PropTypes from "prop-types";

export default class ImageCell extends React.PureComponent {
	static propTypes = {
		data: PropTypes.object.isRequired,
		index: PropTypes.number.isRequired,
		imageId: PropTypes.string.isRequired,
		source: PropTypes.any.isRequired,

		imageMargin: PropTypes.number.isRequired,
		imagesPerRow: PropTypes.number.isRequired,
		containerWidth: PropTypes.number,

		imageContainerStyle: PropTypes.object,
		renderIndividualHeader: PropTypes.func,
		renderIndividualFooter: PropTypes.func,

		onPressImage: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			imageLoaded: false
		};

		Dimensions.addEventListener("change", this.setImageSize);

		var { width } = Dimensions.get("window");
		var { imageMargin, imagesPerRow, containerWidth } = this.props;

		if (typeof containerWidth !== "undefined") {
			width = containerWidth;
		}

		this.state.imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;
	}

	setImageSize = () => {
		var { width } = Dimensions.get("window");
		var { imageMargin, imagesPerRow, containerWidth } = this.props;

		if (typeof containerWidth !== "undefined") {
			width = containerWidth;
		}

		this.setState({
			imageSize: (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow
		});
	}

	_onPressImage = async (uri) => {
		// Wait for the image to load before reacting to press events
		if (this.state.imageLoaded) {
			this.props.onPressImage(this.props.imageId, this.props.index);
		}
	}

	componentWillUnmount() {
		Dimensions.removeEventListener("change", this.setImageSize);
	}

	render() {
		const {
			imageSize
		} = this.state;
		const {
			data, index, source, imageMargin, imagesPerRow,
			imageContainerStyle, renderIndividualHeader,
			renderIndividualFooter
		} = this.props;
		const header = (renderIndividualHeader) &&
			renderIndividualHeader(data, index);
		const footer = (renderIndividualFooter) &&
			renderIndividualFooter(data, index);
		return (
			<TouchableOpacity
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
					onLoad={() => {
						this.setState({ imageLoaded: true });
					}}
					source={source}
					resizeMode="cover"
					style={{
						height: imageSize,
						width: imageSize,
						backgroundColor: "lightgrey",
						...imageContainerStyle
					}}
				/>
				{footer}
			</TouchableOpacity>
		);
	}
}
