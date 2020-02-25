import React, { Component } from 'react'
import { FormDownloadFiles } from '../../component/formDownloadFile/FormDownloadFiles/FormDownloadFiles';

class FormDownloadFilesContainer extends Component {
    constructor(props) {
        super(props);
        this.titleEnd = this.getSwitchForm();
    }

    getSwitchForm = () => {
        const { downloadFrom } = this.props;

        if (downloadFrom === 'local') return "компьютера";
        if (downloadFrom === 'url') return "интернета";
    }

    render() {
        const { titleEnd } = this;
        const { downloadFrom } = this.props;

        return <FormDownloadFiles
            titleEnd={titleEnd}
            downloadFrom={downloadFrom}
        />
    }
}

export default FormDownloadFilesContainer;
