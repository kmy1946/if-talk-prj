//reducersの法則
//storeのstateの管理者的な人
//初期状態initialStateが必要
//①状態を完全に上書きする
//②actionを受け取ってstoreに伝える
//③第１引数→state = stateの現在 or 初期状態
//④第２引数→actionがreturnした値
import * as Actions from './actions';
import initialState from '../store/initialState';

export const ProductsReducer = (state=initialState.products, action) => {//③④
  switch (action.type) {
      case Actions.DELETE_PRODUCT:
        return {
          ...state,
          list: [...action.payload]
        };
      case Actions.FETCH_PRODUCTS:
        return {
          ...state,
          list: [...action.payload]//配列を展開し、さらに配列に書き込む => store内のメモリを変更し、新しい配列として扱え、componentか検知できる
        };
      default:
        return state
  }
}