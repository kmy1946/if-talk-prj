import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signInAction } from "../reducks/users/actions";
import { useHistory } from "react-router-dom";
import { signIn } from "../reducks/users/operations";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => {
        dispatch(signIn())
        history.push('/')
          }}>
        ログイン
      </button>
    </div>
  )
}
export default Login;