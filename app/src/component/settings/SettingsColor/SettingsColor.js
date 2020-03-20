import React from 'react';


const SettingsColor = ({ handleInput, setColor }) => {
    return (
        <>
            <h2>Главный цвет</h2>
            <input type="text" placeholder="#color" onChange={handleInput} />
            <button onClick={setColor}>Сохранить</button>
        </>
    );
}

export default SettingsColor;