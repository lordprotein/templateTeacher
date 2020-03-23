import React from 'react';
import styles from './FileList.module.css';
import stylesFormEditer from '../../FormEditer/FormEditer.module.css';
import FormDownloadFilesContainer from '../../../container/formDownloadFile/FormDownloadFilesContainer';


export const FileList = ({ title, toBack, postID, children }) => {
    return (
        <div className={styles.fileDownload}>
            <div className={styles.left}>
                <FormDownloadFilesContainer
                    downloadFrom="local"
                    postID={postID}
                />
                {/* <FormDownloadFilesContainer
                    downloadFrom="url"
                    postID={postID}
                /> */}
                <div>
                    <button className={stylesFormEditer.btnFalse} onClick={toBack}>Закрыть</button>
                    {/* <button className={stylesFormEditer.btnTrue}>Загрузить</button> */}
                </div>
            </div>
            <div className={styles.rigth}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.itemList}>
                    {children.length ? children : <div>Нет файлов</div>}
                </div>
            </div>
        </div>
    );
}
