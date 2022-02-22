import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from "../reducks/users/selectors";
import { listenAuthState } from "../reducks/users/operations";
import { push } from "connected-react-router";
import { hideLoadingAction, showLoadingAction } from "../reducks/loading/actions";

//ユーザーのサインイン状況を判定、さもなくばlistenAuthStateを呼ぶ
const Auth = ({children}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    const f = async() => {
      if (!isSignedIn) {
        dispatch(listenAuthState())
        dispatch(push('/'));
      }
    };
    
    f();
    //dispatch(showLoadingAction("Loading..."));
    
  }, []);

  if (!isSignedIn) {//SignInしてないなら空のJSX
    dispatch(hideLoadingAction());
    return <>サインインしていません。</>
  } else {//しているなら子要素を返す、<Auth>子</Auth> in Routering.js
    return children
  }
};

export default Auth;