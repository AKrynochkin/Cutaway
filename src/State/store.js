import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const middleware = [
  thunk
];

let composeEnchancer = applyMiddleware(...middleware);

if (__DEVTOOLS__) {
  const composeWithDevTools = require('redux-devtools-extension').composeWithDevTools;

  composeEnchancer = composeWithDevTools(applyMiddleware(...middleware));
}

const store = createStore(
  combineReducers({
    ...reducers
  }),
  composeEnchancer
);

export default store;
