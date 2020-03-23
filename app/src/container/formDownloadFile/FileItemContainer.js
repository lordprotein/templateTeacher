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
        this.db = new dbService();
        this.domain = this.db.domain;
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
        const formEditer = document.getElementById('form_editer');

        const elem = this._getLink();

        formEditer.setRangeText(elem);

        this.onBack();
    }

    _getLink = () => {
        const { fileData: { type, name } } = this.props;
        let { fileData: { path } } = this.props;

        switch (type) {
            case 'image': {
                const { radioImg } = this;

                return `\n \n <img src="${this.domain}/${path}" class="${radioImg}" alt="${name}" />\n \n`;
            }
            case 'document': {
                path = path.replace('downloads', 'download');
                return `\n \n <a href="${this.domain}/${path}" target="_blank">Скачать ${name}</a>\n \n`;
            }
            case 'video': {
                return `\n \n <video controls><source src="${this.domain}/${path}"></video> \n \n`;
            }
            case 'audio': {
                return `\n \n <audio controls><source src="${this.domain}/${path}"></audio>\n \n`;
            }

            default: return false;
        }
    }

    handleRadio = value => {
        this.radioImg = value;
    }

    render() {
        const { fileData: { type, path, name } } = this.props;
        return (
            <FileItem
                type={type}
                path={path}
                name={name}
                onRemove={this.onRemove}
                onPast={this.onPast}
                handleRadio={value => this.handleRadio(value)}
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
