import React from 'react';
import styles from './FormDownloadFiles.module.css';


export const FormDownloadFiles = ({ titleEnd, downloadFrom, onSubmit, handleInputValue, acceptAttr, progressDownload }) => {
    let input;

    if (downloadFrom === 'url') {
        input = <input
            type="text"
            name="filedata"
            // id="download_url"
            placeholder="url"
            onChange={handleInputValue}
        />
    }
    if (downloadFrom === 'local') {
        input = <input
            type="file"
            name="filedata"
            // id="download_local"
            accept={acceptAttr}
            className={styles.formDownload}
            onChange={handleInputValue}
        />
    }


    return (
        <div className={styles.inputWrap}>
            <h3 className={styles.title}>Загрузить с <br /> {titleEnd}</h3>
            {input}
            <button className={styles.btnTrue} onClick={onSubmit}>Загрузить</button>
            {progressDownload &&
                (
                    <div className={styles.lineDownload}>
                        <div className={styles.lineDownload_progress} style={{ width: `${progressDownload}%` }}>
                            {progressDownload}%
                        </div>
                    </div>
                )
            }

        </div>
    )
}