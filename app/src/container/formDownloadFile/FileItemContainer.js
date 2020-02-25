import React, { Component } from 'react';
import { FileItem } from '../../component/formDownloadFile/FileItem/FileItem';
import PropTypes from 'prop-types';


export default class FileItemContainer extends Component {
    render() {
        const { fileData: { fileType, path } } = this.props;

        return (
            <FileItem
                fileType={fileType}
                path={path}
            />
        );
    }
}

FileItemContainer.propTypes = {
    fileData: PropTypes.object.isRequired
}