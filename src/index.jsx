import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import './config/msgs';
// import './config/axios';

import reducer from './redux-flow/reducers/reducers';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer position="top-center" autoClose={2000} style={{ textAlign: "center" }} />
            <App />
        </BrowserRouter>
    </Provider >,
    document.getElementById('root'));

