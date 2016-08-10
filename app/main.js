import React from 'react';
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import App from './app.jsx';
import routes from './routes.jsx';
import css from './styles/style.scss';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
