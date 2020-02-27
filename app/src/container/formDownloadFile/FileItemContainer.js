import React, { Component } from 'react';
import { FileItem } from '../../component/formDownloadFile/FileItem/FileItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as reduxActions from '../../redux/actions';
import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';


class FileItemContainer extends Component {
    _remove = () => {
        const { fileData: { ID, path }, fileList, a_setFileList } = this.props;
        const db = new dbService();

        const newFileList = fileList.filter(item => item.ID !== ID);

        a_setFileList(newFileList);

        db.removeFile({ ID, path }).then(res => console.log(res));

    }

    render() {
        const { fileData: { type, path } } = this.props;

        return (
            <FileItem
                type={type}
                path={path}
                onRemove={this._remove}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        fileList: selectors.getFileList(state),
    }
}

const mapDispatchToProps = dispatch => {
    const { a_setFileList } = bindActionCreators(reduxActions, dispatch);

    return { a_setFileList };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileItemContainer);

FileItemContainer.propTypes = {
    fileData: PropTypes.object.isRequired
}
