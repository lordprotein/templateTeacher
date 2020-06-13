import React from 'react';
import styles from './PositionControlItem.module.css';


const PositionControlItem = ({ handleClick, direction }) => {
    return (
        <button onClick={handleClick} className={direction === 'up' ? styles.arrowUp : styles.arrowDown}>
            {/* {direction === 'up' ? 'Вверх' : 'Вниз'} */}
        </button>
    )
}
export default PositionControlItem;