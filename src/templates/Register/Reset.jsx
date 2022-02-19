import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../../components/UIkit";
import { resetPassword } from "../../reducks/users/operations";
import { push } from "connected-react-router";

const Reset = () => {
  const dispatch = useDispatch()
  
  const [email, setEmail] = useState("")

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  return (
    <div className="c-section-container_register">
      <div className="Item-Content-Flg1" />
      <div className="Item-Content-Flg2" />
      <div className="Item-Content-Flg3" />
      <div className="Item-Content-Flg4" />
      <p className="center reset-title">パスワードリセット</p>
      <div className="module-spacer--medium" />
      <div className="reset-form__group">
        <TextInput
            fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
            rows={1} value={email} type={"email"} onChange={inputEmail}
        />
        <div className="module-spacer--small" />
        <p className="reset__message">　※ 再設定用のURLをお送りします。</p>
      </div>
      <div className="center">
        <PrimaryButton
          label={"パスワードリセット"}
          onClick={() => dispatch(resetPassword(email))}
        />
        <div className="module-spacer--medium" />
        <p onClick={() => {dispatch(push('/signin'))}}>ログイン画面へ</p>
        <div className="module-spacer--small" />
      </div>
    </div>
  )
}
export default Reset;