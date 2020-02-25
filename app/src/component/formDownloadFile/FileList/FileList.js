import React from 'react';
import styles from './FileList.module.css';
import stylesFormEditer from '../../FormEditer/FormEditer.module.css';


export const FileList = ({ title, toBack, children }) => {
    return (
        <div className={styles.fileDownload}>
            <div className={styles.left}>
                <div className={styles.inputWrap}>
                    <h3 className={styles.title}>Загрузить с <br /> компьютера</h3>
                    <input type="file" className={styles.btnDownload} />
                </div>
                <div className={styles.inputWrap}>
                    <h3 className={styles.title}>Загрузить с <br /> Интернета</h3>
                    <input type="file" className={styles.btnDownload} />
                </div>
                <div>
                    <button className={stylesFormEditer.btnFalse} onClick={toBack}>Закрыть</button>
                    <button className={stylesFormEditer.btnTrue}>Подтвердить</button>
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
