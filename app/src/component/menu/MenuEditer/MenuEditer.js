import React from 'react';
import styles from './MenuEditer.module.css';


export const MenuEditer = ({ toReset, toSubmit, handleChange, defValue }) => {
    defValue = defValue ? { defaultValue: defValue } : false;

    return (
        <div className={styles.editer}>
            <input
                type="text"
                onChange={handleChange}
                className={styles.input}
                {...defValue}
            />
            <button onClick={toSubmit}>Ок</button>
            <button onClick={toReset}>Отмена</button>
        </div>
    );
}

