import React from 'react';
import styles from './FileList.module.css';
import stylesFormEditer from '../../FormEditer/FormEditer.module.css';
import FormDownloadFilesContainer from '../../../container/formDownloadFile/FormDownloadFilesContainer';


export const FileList = ({ title, toBack, children }) => {
    return (
        <div className={styles.fileDownload}>
            <div className={styles.left}>
                <FormDownloadFilesContainer downloadFrom="local" />
                <FormDownloadFilesContainer downloadFrom="url" />
                <div>
                    <button className={stylesFormEditer.btnFalse} onClick={toBack}>Закрыть</button>
                    {/* <button className={stylesFormEditer.btnTrue}>Загрузить</button> */}
                </div>
            </div>
            <div className={styles.rigth}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.itemList}>
                    {children}
                </div>
            </div>
        </div>
    );
}
