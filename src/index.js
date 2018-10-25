import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './Views/App';

import store from './State/store';

import 'normalize.css';
import './styles/index.scss';
import './Assets/icons/favicon.ico';

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.render((
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    ), document.getElementById('root'));
  });
}
