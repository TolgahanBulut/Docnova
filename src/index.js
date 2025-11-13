import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { message } from 'antd';
import App from './App';
import './i18n/i18n';
import 'antd/dist/reset.css';

message.config({
  top: 24,
  duration: 3,
  maxCount: 3,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);