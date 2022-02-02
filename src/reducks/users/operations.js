import { signInAction } from "./actions";
import { push } from "connected-react-router";
export const signIn = (  ) => {
  return async ( dispatch, getState) => {//dispatch->actionsを呼び出す、getState()->storeの現在のstateを取得する
    const state = getState()//()メソッドとして呼ぶ
    const isSignedIn = state.users.isSignedIn//getStateメソッドによりisSignedInを取得
    if (!isSignedIn) {//サインインしていないなら
      const url = 'https://api.github.com/users/kmy1946'

      const response = await fetch(url)//非同期処理のfetch()をawaitで待たせる
                          .then(res => res.json())
                          .catch(() => null)

      const username = response.login

      dispatch(signInAction( {
        isSignedIn:true,
        uid:"00001",
        username:username
      } ))
      dispatch(push('/')) 
    }
  }
}