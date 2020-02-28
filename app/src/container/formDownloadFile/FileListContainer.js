import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { FileList } from '../../component/formDownloadFile/FileList/FileList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';
import FileItemContainer from './FileItemContainer';



class FileListContainer extends Component {
    componentDidMount = () => {
        console.log('open')
        const { getTypeFiles, postID, a_setFileList } = this.props;

        const db = new dbService();

        db.getFiles(postID, getTypeFiles)
            .then(itemList => {
                console.log(itemList)
                if (!itemList.length) return console.log('Haven`t files');

                a_setFileList(itemList)
            });
    }

    componentWillUnmount = () => {
        const { a_setFileList } = this.props;
        a_setFileList([]);
    }

    toBack = () => {
        const { a_toggleDownloadFilesForm } = this.props;
        a_toggleDownloadFilesForm(false);
    }

    _getItemList = () => {
        const { fileList } = this.props;

        return fileList.map(itemData => {
            return (
                <FileItemContainer
                    fileData={itemData}
                    key={itemData.ID}
                />
            );
        })
    }

    render() {
        const { postID, getTypeFiles } = this.props;

        return (
            <FileList
                title={getTypeFiles}
                toBack={() => this.toBack()}
                postID={postID}
            >
                {this._getItemList()}
            </FileList>
        );
    }
}

const mapStateToProps = state => {
    return {
        getTypeFiles: selectors.getTypeFiles(state),
        fileList: selectors.getFileList(state),
    }
}

const mapDispatchToProps = dispatch => {
    const { a_toggleDownloadFilesForm, a_setFileList } = bindActionCreators(actions, dispatch);
    return {
        a_toggleDownloadFilesForm,
        a_setFileList
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileListContainer)

FileListContainer.propTypes = {

}