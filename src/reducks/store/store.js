//reducersとactionsでusersやproductsなどのstateを管理
import { 
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import persistState from "redux-localstorage";

import { UsersReducer } from '../users/reducers';
import {LoadingReducer} from '../loading/reducers';
import { ProductsReducer } from '../products/reducers';
import thunk from 'redux-thunk';//Reduxで非同期処理を制御する==Actionsがasync/awaitとPromiseを使えるようにする


export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      loading: LoadingReducer,
      products:ProductsReducer,
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware( 
      routerMiddleware(history), 
      thunk ),
  )
}