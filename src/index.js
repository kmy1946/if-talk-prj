import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
} from 'redux-persist';
//import { persistStore } from 'redux-persist';
//import { PersistGate } from "redux-persist/integration/react";
import * as History from 'history'
import { MuiThemeProvider } from '@material-ui/core';
import App from './App';
import reportWebVitals from './reportWebVitals';
import createStore from './reducks/store/store';
import { theme } from './assets/theme';
import { UsersReducer } from './reducks/users/reducers';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './reducks/store/ConfigureStore';

const history = History.createBrowserHistory();//ブラウザの画面遷移の履歴を管理

const store = createStore(history);

//let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    {/*
    const { store, persistor } = configureStore();
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
    */}
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
