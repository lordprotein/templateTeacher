import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/app/App';
import { BrowserRouter } from 'react-router-dom';

const AppRender = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );

}

ReactDOM.render(<AppRender />, document.getElementById('root'));