import React from 'react';

const SettingsMainImg = ({ setImg, handleInput }) => {
    return (
        <div style={{margin: '30px 0'}}>
            <h2 style={{marginBottom: '10px', color: '#545454'}}>Главное изображение (верхняя часть)</h2>
            <label>
                <input type="file" name="filedata" accept="image/*" onChange={handleInput} />
                <button onClick={setImg}>Сохранить</button>
            </label>
        </div>
    );
}

export default SettingsMainImg;