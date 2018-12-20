import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

export default class Header extends React.PureComponent {
    static propTypes = {
        renderPageHeader: PropTypes.func,
        images: PropTypes.array.isRequired,
        galleryIndex: PropTypes.number.isRequired,
        onClose: PropTypes.func.isRequired
    }

    render() {
        const { renderPageHeader, images, galleryIndex, onClose } = this.props;
        const header = this.props.renderPageHeader &&
            renderPageHeader(images[galleryIndex], galleryIndex, onClose);
        return (
            <View style={{ top: 0, width: "100%", position: "absolute", zIndex: 1000 }}>
                { header }
            </View>
        );
    }
}
