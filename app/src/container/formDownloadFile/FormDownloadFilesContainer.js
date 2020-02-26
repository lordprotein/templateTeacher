import React, { Component } from 'react'
import { FormDownloadFiles } from '../../component/formDownloadFile/FormDownloadFiles/FormDownloadFiles';
import dbService from '../../service/service';

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
        const value = e.target;
        this.value = value;
        // console.log(e.target)
    }


    handleSubmitForLocal = () => {
        let { value } = this;
        const { postID } = this.props;

        if (!value) return console.log('Haven`t a value');
        value = value.files[0];

        const db = new dbService();
        
        db.downloadImg(postID, value)
            .then(res => console.log(res))
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

export default FormDownloadFilesContainer;
