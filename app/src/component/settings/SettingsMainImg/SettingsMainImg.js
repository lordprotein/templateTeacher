import React from 'react';

const SettingsMainImg = () => {
    return (
        <>
        <h2>Главное изображение (верхняя часть)</h2>
            <label>
                <input type="file" accept="image/*" />
                <button>Сохранить</button>
            </label>
        </>
    );
}

export default SettingsMainImg;