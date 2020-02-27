import React, { Component } from 'react';
import { FileItem } from '../../component/formDownloadFile/FileItem/FileItem';
import PropTypes from 'prop-types';


export default class FileItemContainer extends Component {
    _remove = () => {

    }

    render() {
        const { fileData: { type, path } } = this.props;

        return (
            <FileItem
                type={type}
                path={path}
            />
        );
    }
}

FileItemContainer.propTypes = {
    fileData: PropTypes.object.isRequired
}