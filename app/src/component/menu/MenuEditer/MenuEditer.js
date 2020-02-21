import React from 'react';
import styles from './MenuEditer.module.css';
import PropTypes from 'prop-types';


export const MenuEditer = ({ toReset, toSubmit, handleChange, defValue }) => {
    defValue = defValue ? { defaultValue: defValue } : false;

    return (
        <div className={styles.editer}>
            <input
                type="text"
                onChange={handleChange}
                className={styles.input}
                {...defValue}
                placeholder="Введите название"
            />
            <button onClick={toSubmit}>Ок</button>
            <button onClick={toReset}>Отмена</button>
        </div>
    );
}

MenuEditer.propTypes = {
    toReset: PropTypes.func.isRequired,
    toSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    defValue: PropTypes.string
}
