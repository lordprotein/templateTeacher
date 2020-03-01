import React, { Component } from 'react';
import { FileItem } from '../../component/formDownloadFile/FileItem/FileItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as reduxActions from '../../redux/actions';
import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';


class FileItemContainer extends Component {
    constructor(props) {
        super(props);
        this.domain = 'http://localhost:3333';
    }

    onRemove = () => {
        const { fileData: { ID, path }, fileList, a_setFileList } = this.props;
        const db = new dbService();

        const newFileList = fileList.filter(item => item.ID !== ID);

        a_setFileList(newFileList);

        db.removeFile({ ID, path }).then(res => console.log(res));
    }

    onBack = () => {
        const { a_toggleDownloadFilesForm } = this.props;
        a_toggleDownloadFilesForm(false);
    }

    onPast = () => {
        const { fileData: { type, path, name } } = this.props;

        const formEditer = document.getElementById('form_editer');

        const selected = this._getSelectedText(formEditer);

        let elem;

        switch (type) {
            case 'image': {
                elem = `<img src="${this.domain}/${path}" alt="${name}" />`;
                break;
            }
            case 'document': {
                elem = `<a href="${this.domain}/${path}" target="_blank" >Скачать ${name}</a>`;
                break;
            }

            default: break;
        }
        // const elem = (typeof (past) === 'string' ? );
        formEditer.setRangeText(elem);
        this.onBack();
    }


    _getSelectedText = formEditer => {
        let start = formEditer.selectionStart,
            end = formEditer.selectionEnd;

        // if(!start && !end) {
        //     start = 
        // }

        return formEditer.value.slice(start, end);
    }

    // _getPosCaret = formEditer => {
    //     let caretPos = 0;

    //     if (document.selection) {
    //         formEditer.focus();
    //         const Sel = document.selection.createRange();
    //         Sel.moveStart('character', -formEditer.value.length);
    //         caretPos = Sel.text.length;
    //     }
    //     else
    //         if (formEditer.selectionStart || formEditer.selectionStart === '0') {
    //             caretPos = formEditer.selectionStart;
    //         }

    //     return caretPos;
    // }


    render() {
        const { fileData: { type, path } } = this.props;

        return (
            <FileItem
                type={type}
                path={path}
                onRemove={this.onRemove}
                onPast={this.onPast}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        fileList: selectors.getFileList(state),
        // typeFiles: selectors.getTypeFiles(state),
    }
}

const mapDispatchToProps = dispatch => {
    const { a_setFileList, a_toggleDownloadFilesForm } = bindActionCreators(reduxActions, dispatch);

    return { a_setFileList, a_toggleDownloadFilesForm };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileItemContainer);

FileItemContainer.propTypes = {
    fileData: PropTypes.object.isRequired
}
