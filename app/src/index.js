import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './container/App/App';
import { BrowserRouter } from 'react-router-dom';
import reducer from './redux/reducer';


const AppRender = () => {
    const store = createStore(reducer);
    
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );

}

ReactDOM.render(<AppRender />, document.getElementById('root'));