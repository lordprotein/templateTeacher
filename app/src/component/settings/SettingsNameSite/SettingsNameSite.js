import React from 'react';

const SettingsNameSite = () => {
    return (
        <>
            <h2>Название сайта</h2>
            <div>
                <input type="text" placeholder="Введите название" />
                <button>Сохранить</button>
            </div>
        </>
    );
}

export default SettingsNameSite;