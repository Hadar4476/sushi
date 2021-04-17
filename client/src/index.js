import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter } from 'react-router-dom';

import 'popper.js/dist/popper';
import 'jquery/dist/jquery';

import './index.css';
import 'animate.css/animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'boxicons';

import App from './App';

import SignUpProvider from './context/signUpContext';
import SignInProvider from './context/signInContext';

import userReducer from './store/reducers/user';
import dishTypesReducer from './store/reducers/dishTypes';
import orderManagerReducer from './store/reducers/orderManager';
import myOrdersReducer from './store/reducers/myOrders';

import {
  watchGetAuthenticatedUser,
  watchInitSushiTypes,
  watchInitVeganTypes,
  watchInitWokTypes,
  watchSearchForDishType,
  watchSubmitOrder,
  watchInitMyOrders,
} from './store/sagas';

import reportWebVitals from './reportWebVitals';

const rootReducer = combineReducers({
  user: userReducer,
  dishTypes: dishTypesReducer,
  orderManager: orderManagerReducer,
  myOrders: myOrdersReducer,
});

const sagaMiddleWare = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleWare))
);

sagaMiddleWare.run(watchGetAuthenticatedUser);
sagaMiddleWare.run(watchInitSushiTypes);
sagaMiddleWare.run(watchInitVeganTypes);
sagaMiddleWare.run(watchInitWokTypes);
sagaMiddleWare.run(watchSearchForDishType);
sagaMiddleWare.run(watchSubmitOrder);
sagaMiddleWare.run(watchInitMyOrders);

ReactDOM.render(
  <Provider store={store}>
    <SignInProvider>
      <SignUpProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SignUpProvider>
    </SignInProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
