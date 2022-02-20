import { 
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import * as History from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
} from 'redux-persist';
import { composeWithDevTools } from '@redux-devtools/extension';
import { UsersReducer } from '../users/reducers';
import {LoadingReducer} from '../loading/reducers';
import { ProductsReducer } from '../products/reducers';
import thunk from 'redux-thunk';//Reduxで非同期処理を制御する==Actionsがasync/awaitとPromiseを使えるようにする
import createStore from './store';
import persistStore from 'redux-persist/lib/persistStore';

const history = History.createBrowserHistory();//ブラウザの画面遷移の履歴を管理
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users']
};

const persistedReducer = persistReducer(persistConfig, UsersReducer);

export default function configureStore() {
  const store = createStore(
      //history,
      persistedReducer,
      //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(thunk)
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
