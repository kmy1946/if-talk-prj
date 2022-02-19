import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { TextInput } from "../../components/UIkit";
import { PrimaryButton } from "../../components/UIkit";
import { signUp } from "../../reducks/users/operations";
import { push } from "connected-react-router";
import './Register.css';
const SignUp = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState(""),
        [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),
        [confirmPassword, setConfirmPassword] = useState("");

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value)
  }, [setUsername])
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])
  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword])
  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value)
  }, [setConfirmPassword])

  return (
    <div className="c-section-container_register">
      <p className="center signup-title">アカウント登録</p>
      <div className="module-spacer--medium" />
      <TextInput
          fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
          rows={1} value={username} type={"text"} onChange={inputUsername}
      />
      <TextInput
          fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
          rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput
          fullWidth={true} label={"パスワード"} multiline={false} required={true}
          rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <TextInput
          fullWidth={true} label={"パスワード（再確認）"} multiline={false} required={true}
          rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"アカウントを登録する"}
          onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
        />
        <div className="center">
          <a href="/signin" className='signup-register-link'>アカウントをお持ちの方はこちら</a>
        </div>
      </div>
    </div>
  )
}
export default SignUp;