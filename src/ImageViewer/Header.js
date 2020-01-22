import React from "react";
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
        return header;
    }
}
