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
        this.abortDownload = null;
        this.state = { progressDownload: 0 };
    }

    componentDidMount() {
        this._isMounted = true;
      }
    
    componentWillUnmount = () => {
        this._isMounted = false;
        if (this.abortDownload) this.abortDownload();

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

    toggleDownload = (abortDownload, progressDownload) => {
        if (this._isMounted) this.setState({ progressDownload });
        this.abortDownload = abortDownload;
    }

    handleSubmitForLocal = () => {
        let { value } = this;
        const { postID, getTypeFiles, a_setFileList } = this.props;

        if (!value) return console.log('Haven`t a value');
        value = value.files[0];

        const db = new dbService();
        const data = {
            file: value,
            type: getTypeFiles
        }

        const xhrFunc = (progressDownload, breakDownload) => {
            this.toggleDownload(breakDownload, progressDownload)
        }

        db.downloadFile(postID, getTypeFiles, data, xhrFunc)
            .then(res => {
                this.toggleDownload(null, 0);

                db.getFiles(postID, getTypeFiles)
                    .then(itemList => {
                        if (!itemList.length) return console.log('Haven`t files');

                        a_setFileList(itemList)
                    });
            },
                err => this.toggleDownload(null, 0))
    }

    handleSubmitForUrl = () => {
        console.log('url func')
    }


    render() {
        const { titleEnd } = this;
        const { downloadFrom, getAcceptAttr } = this.props;
        const { progressDownload } = this.state;

        return (
            <FormDownloadFiles
                titleEnd={titleEnd}
                downloadFrom={downloadFrom}
                handleInputValue={e => this.handleInputValue(e)}
                onSubmit={() => this.action()}
                acceptAttr={getAcceptAttr}
                progressDownload={progressDownload}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        getTypeFiles: selectors.getTypeFiles(state),
        getAcceptAttr: selectors.getAcceptAttr(state),
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
