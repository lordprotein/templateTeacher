import React from 'react';

const SettingsMainImg = ({ setImg, handleInput }) => {
    return (
        <>
            <h2>Главное изображение (верхняя часть)</h2>
            <label>
                <input type="file" name="filedata" accept="image/*" onChange={handleInput} />
                <button onClick={setImg}>Сохранить</button>
            </label>
        </>
    );
}

export default SettingsMainImg;