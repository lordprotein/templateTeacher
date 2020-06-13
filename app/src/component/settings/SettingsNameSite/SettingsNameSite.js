import React from 'react';

const SettingsNameSite = ({ setName, handleInput, siteName }) => {
    return (
        <>
            <h2 style={{marginBottom: '10px', color: '#545454'}}>Название сайта</h2>
            <div>
                <input type="text" placeholder={'Новое название'} onChange={handleInput} />
                <button onClick={setName}>Сохранить</button>
            </div>
        </>
    );
}

export default SettingsNameSite;