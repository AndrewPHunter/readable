import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import WebFontLoader from 'webfontloader';

import './index.css';
import configureStore from './store/configureStore';
import App from './containers/App';

const store = configureStore();

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700','Material Icons'],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
