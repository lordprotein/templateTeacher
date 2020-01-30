import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './container/App/App';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';


const AppRender = () => {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );

}

ReactDOM.render(<AppRender />, document.getElementById('root'));