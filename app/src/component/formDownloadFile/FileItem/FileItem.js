import React from 'react';
import styles from './FilteItem.module.css';
import PropTypes from 'prop-types';
import dbService from '../../../service/service';


export const FileItem = ({ type, path, name, onRemove, onPast, handleRadio }) => {
    const db = new dbService();
    let link = db.domain;
    let block, blockSettings;

    switch (type) {
        case 'image': {
            blockSettings = (
                <div className={styles.settings}>
                    <label onClick={() => handleRadio(styles.smallImg)}>
                        <input type="radio" name={`radio_${name}`} />
                    Маленький
                </label>
                    <label onClick={() => handleRadio(styles.middleImg)}>
                        <input type="radio" name={`radio_${name}`} />
                    Средний
                </label>
                    <label onClick={() => handleRadio(styles.largeImg)}>
                        <input type="radio" name={`radio_${name}`} />
                    Большой
                </label>
                </div>
            );
            block = (<img src={`${link}/${path}`} alt="img" />);
            break;
        }
        case 'document': {
            block = (<div>{name}</div>);
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
            {blockSettings}
            <button onClick={onPast} className={styles.btnUse}>Добавить</button>
        </div>
    )
}

FileItem.propTypes = {
    type: PropTypes.string.isRequired,
    path: PropTypes.string
}