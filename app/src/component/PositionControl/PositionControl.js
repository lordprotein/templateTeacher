import React from 'react';
import styles from './PositionControl.module.css';

const PositionControl = ({ children }) => {
    return (
        <div className={styles.sequence}>
            {children}
        </div>
    )
}
export default PositionControl;