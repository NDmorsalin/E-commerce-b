/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemple from 'react-alert-template-basic';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './store';

const options = {
    transitions: transitions.SCALE,
    positions: positions.TOP_RIGHT,
    timeout: 5000
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <AlertProvider template={AlertTemple} {...options}>
                <App />
            </AlertProvider>
        </BrowserRouter>
    </Provider>
);
