import React from 'react';
import styles from './FilteItem.module.css';
import PropTypes from 'prop-types';


export const FileItem = ({ type, path }) => {
    let link = `http://localhost:3333`;

    switch (type) {
        case 'image': {
            return (<img src={`${link}/${path}`} className={styles.item} alt="img" />);
        }
        default: return (<div className={styles.item}></div>);
    }
}

FileItem.propTypes = {
    type: PropTypes.string.isRequired,
    path: PropTypes.string
}