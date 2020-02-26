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
            this.action = this.handleSubmitForLocal;
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


    handleSubmitForLocal = () => {
        let { value } = this;
        const { postID, getTypeFiles, a_setFileList } = this.props;
        
        if (!value) return console.log('Haven`t a value');
        value = value.files[0];

        const db = new dbService();

        db.downloadImg(postID, value)
            .then(res => {
                db.getFiles(postID, getTypeFiles)
                    .then(itemList => {
                        if (!itemList.length) return console.log('Haven`t files');

                        a_setFileList(itemList)
                    });
                console.log(res);
            })
    }

    handleSubmitForUrl = () => {
        console.log('url func')
    }

    render() {
        const { titleEnd } = this;
        const { downloadFrom } = this.props;

        return <FormDownloadFiles
            titleEnd={titleEnd}
            downloadFrom={downloadFrom}
            handleInputValue={e => this.handleInputValue(e)}
            onSubmit={() => this.action()}
        />
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
