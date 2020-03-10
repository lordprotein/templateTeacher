import React from 'react';

const PositionControlItem = ({ handleClick, direction }) => {
    return (
        <button onClick={handleClick}>
            {direction === 'up' ? 'Вверх' : 'Вниз'}
        </button>
    )
}
export default PositionControlItem;