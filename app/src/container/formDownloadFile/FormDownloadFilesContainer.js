import React, { Component } from 'react'
import { FormDownloadFiles } from '../../component/formDownloadFile/FormDownloadFiles/FormDownloadFiles';
import dbService from '../../service/service';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors } from '../../redux/reducer';
import * as actions from '../../redux/actions';


class FormDownloadFilesContainer extends Component {
    constructor(props) {
        super(props);
        this.action = null;
        this.titleEnd = this.getSwitchForm();
    }

    getSwitchForm = () => {
        const { downloadFrom } = this.props;

        if (downloadFrom === 'local') {
            this.action = this.createFileForLocal;
            return "компьютера";
        };
        if (downloadFrom === 'url') {
            this.action = this.handleSubmitForUrl;
            return "интернета";
        }
    }

    handleInputValue = e => {
        this.value = e.target;
    }

    createFileForLocal = () => {
        const { postID, getTypeFiles, a_setFileList, fileList } = this.props;

        const file = this.value.files[0];
        if (!file) return console.log('Haven`t a value');

        const db = new dbService();

        db.downloadImg(postID, getTypeFiles, file)
            .then(({ ID, path, filename }) => {
                const newFile = {
                    ID,
                    ID_CONTENT: postID,
                    name: filename,
                    path,
                    type: getTypeFiles
                }

                const newFileList = [...fileList];
                newFileList.push(newFile)
                
                a_setFileList(newFileList);

            })
    }

    handleSubmitForUrl = () => {
        console.log('url func')
    }

    render() {
        const { titleEnd } = this;
        const { downloadFrom } = this.props;

        return (
            <FormDownloadFiles
                titleEnd={titleEnd}
                downloadFrom={downloadFrom}
                handleInputValue={e => this.handleInputValue(e)}
                onSubmit={() => this.action()}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        getTypeFiles: selectors.getTypeFiles(state), // To delete
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

export default connect(mapStateToProps, mapDispatchToProps)(FormDownloadFilesContainer)
