import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from "../reducks/users/selectors";
import { listenAuthState } from "../reducks/users/operations";
import { push } from "connected-react-router";

//ユーザーのサインイン状況を判定、さもなくばlistenAuthStateを呼ぶ
const Auth = ({children}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect( () => {//↓children ➝ useEffect (初回レンダリング時)
    if (!isSignedIn) {//reduks/store:stateからログイン状態を判断
      dispatch(push('/'));
      //dispatch(listenAuthState())//operationであり、reduxの関数なのでuseDispatch使用
    }
  }, []);

  if (isSignedIn === false) {//SignInしてないなら空のJSX
    return <>サインインしていません。</>
  } else {//しているなら子要素を返す、子要素＝<Auth></Auth>に囲われてる in Routering.js
    return children
  }
};

export default Auth;