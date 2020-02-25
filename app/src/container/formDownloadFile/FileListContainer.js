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
    state = {
        items: [],
        typeFiles: '',
    }

    componentDidMount = () => {
        const { getTypeFiles, postID } = this.props;
        const db = new dbService();

        console.log(postID, getTypeFiles)
        db.getFiles(postID, getTypeFiles)
            .then(itemList => {
                console.log(itemList);
                this.setState({ items: itemList, typeFiles: itemList[0].type });
            })
    }

    toBack = () => {
        const { a_toggleDownloadFilesForm } = this.props;
        a_toggleDownloadFilesForm(false);
    }

    getItemList = () => {
        const { items } = this.state;

        return items.map(itemData => {
            return (
                <FileItemContainer
                    fileData={itemData}
                    key={itemData.ID}
                />
            );
        })
    }

    render() {
        const { typeFiles } = this.state;

        return (
            <FileList
                title={typeFiles}
                toBack={() => this.toBack()}
            >
                {this.getItemList()}
            </FileList>
        );
    }
}

const mapStateToProps = state => {
    return {
        getTypeFiles: selectors.getTypeFiles(state), // To delete
    }
}

const mapDispatchToProps = dispatch => {
    const { a_toggleDownloadFilesForm } = bindActionCreators(actions, dispatch);
    return { a_toggleDownloadFilesForm };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileListContainer)

FileListContainer.propTypes = {

}