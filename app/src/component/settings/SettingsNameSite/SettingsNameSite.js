import React from 'react';

const SettingsNameSite = ({ setName, handleInput, siteName }) => {
    return (
        <>
            <h2>Название сайта</h2>
            <div>
                <input type="text" placeholder={siteName} onChange={handleInput} />
                <button onClick={setName}>Сохранить</button>
            </div>
        </>
    );
}

export default SettingsNameSite;