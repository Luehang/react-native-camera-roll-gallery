import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

export default class Footer extends React.PureComponent {
    static propTypes = {
        renderPageFooter: PropTypes.func,
        images: PropTypes.array.isRequired,
        galleryIndex: PropTypes.number.isRequired,
        onClose: PropTypes.func.isRequired
    }

    render() {
        const { renderPageFooter, images, galleryIndex, onClose } = this.props;
        const footer = renderPageFooter &&
            renderPageFooter(images[galleryIndex], galleryIndex, onClose);
        return (
            <View style={{ bottom: 0, width: "100%", position: "absolute", zIndex: 1000 }}>
                { footer }
            </View>
        );
    }
}
