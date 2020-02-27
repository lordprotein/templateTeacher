import React from 'react';
import styles from './FilteItem.module.css';
import PropTypes from 'prop-types';


export const FileItem = ({ type, path }) => {
    let link = `http://localhost:3333`;
    let block;

    switch (type) {
        case 'image': {
            block = (<img src={`${link}/${path}`} className={styles.item} alt="img" />);
            break;
        }
        default: {
            block = (<div className={styles.item}></div>);
            break;
        }
    }

    return (
        <div>
            {block}
        </div>
    )
}

FileItem.propTypes = {
    type: PropTypes.string.isRequired,
    path: PropTypes.string
}