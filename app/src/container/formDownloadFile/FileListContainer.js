import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FileList } from '../../component/formDownloadFile/FileList/FileList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import { selectors } from '../../redux/reducer';



class FileListContainer extends Component {
    toBack = () => {
        const { a_toggleDownloadFilesForm } = this.props;
        a_toggleDownloadFilesForm(false);
    }

    render() {
        const { getTypeFiles } = this.props;
        console.log(getTypeFiles)

        return (
            <FileList
                title={getTypeFiles}
                toBack={() => this.toBack()}
            >
            </FileList>
        );
    }
}

const mapStateToProps = state => {
    return {
        getTypeFiles: selectors.getTypeFiles(state),
    }
}

const mapDispatchToProps = dispatch => {
    const { a_toggleDownloadFilesForm } = bindActionCreators(actions, dispatch);
    return { a_toggleDownloadFilesForm };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileListContainer)

FileListContainer.propTypes = {

}