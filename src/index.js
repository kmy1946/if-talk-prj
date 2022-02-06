import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider } from '@material-ui/core';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import createStore from './reducks/store/store';
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history'
import { theme } from './assets/theme';

const history = History.createBrowserHistory();//ブラウザの画面遷移の履歴を管理
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
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
