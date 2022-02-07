// ...state  -->  spread構文、配列展開
//
//reducersの法則
//storeのstateの管理者的な人
//初期状態initialStateが必要
//①状態を完全に上書きする
//②actionを受け取ってstoreに伝える
//③第１引数→state = stateの現在 or 初期状態
//④第２引数→actionがreturnした値
//
//⑤stateを展開、つまり（isSignedIn:false,uid:"",username:""）を表せる、もし記述漏れがあれば漏れた値は消え去る①
//⑥actionsから受けたstateをpayloadで上書きする①
//⑦初期状態()initialStateに戻る
import * as Action from './actions';
import initialState from '../store/initialState';

export const UsersReducer = (state=initialState.users, action) => {//③④
  switch (action.type) {
    case Action.FETCH_PRODUCTS_IN_BOOKMARK:
      return {
        ...state,
        bookmark:[...action.payload]
      };
    case Action.SIGN_IN:
      return {
        ...state,//⑤
        ...action.payload//⑥
      };
    case Action.SIGN_OUT:
      return {//⑦
        ...state,
        ...action.payload
      };
      default:
        return state
  }
}