//reducersの法則
//storeのstateの管理者的な人
//初期状態initialStateが必要
//①状態を完全に上書きする
//②actionを受け取ってstoreに伝える
//③第１引数→state = stateの現在 or 初期状態
//④第２引数→actionがreturnした値
import * as Action from './actions';
import initialState from '../store/initialState';

export const ProductsReducer = (state=initialState.products, action) => {//③④
  switch (action.type) {
      default:
        return state
  }
}