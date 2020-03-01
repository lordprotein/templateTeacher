import React from 'react';
import styles from './FilteItem.module.css';
import PropTypes from 'prop-types';


export const FileItem = ({ type, path, onRemove, onPast }) => {
    let link = `http://localhost:3333`;
    let block;

    switch (type) {
        case 'image': {
            block = (<img src={`${link}/${path}`} alt="img" />);
            break;
        }
        default: {
            break;
        }
    }

    return (
        <div className={styles.item}>
            <button className={styles.remove} onClick={onRemove}></button>
            {block}
            <button onClick={onPast}>Использовать</button>
        </div>
    )
}

FileItem.propTypes = {
    type: PropTypes.string.isRequired,
    path: PropTypes.string
}