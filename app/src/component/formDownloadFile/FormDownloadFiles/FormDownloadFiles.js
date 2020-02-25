import React from 'react';
import styles from './FormDownloadFiles.module.css';


export const FormDownloadFiles = ({ titleEnd, downloadFrom }) => {
    let input;

    if (downloadFrom === 'url') {
        input = <input type="text" placeholder="url"/>;
    }
    if (downloadFrom === 'local') {
        input = <input type="file" className={styles.btnDownload} />;
    }

    return (
        <div className={styles.inputWrap}>
            <h3 className={styles.title}>Загрузить с <br /> {titleEnd}</h3>
            {input}
            <button className={styles.btnTrue}>Загрузить</button>
        </div>
    )
    // return (
    // <form action={`http://localhost:3333/upload/${postID}`} method="post" encType="multipart/form-data">
    //     <label>Файл</label><br /><br />
    //     <input type="file" name="filedata" /><br /><br />
    //     <input type="submit" value="Send" />
    // </form>
    // );
}