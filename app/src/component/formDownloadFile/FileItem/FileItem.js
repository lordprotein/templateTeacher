import React from 'react';
import styles from './FilteItem.module.css';

export const FileItem = ({ fileType, path }) => {
    let link = `http://localhost:3333`;

    switch (fileType) {
        case 'image': {
            return (<img src={`${link}/${path}`} className={styles.item} alt="img" />);
        }
        default: return (<div className={styles.item}></div>);
    }
} 