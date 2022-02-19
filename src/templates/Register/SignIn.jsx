import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, PrimaryButton, GreenButton } from "../../components/UIkit";
import { signIn } from "../../reducks/users/operations";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core";
//import { getIsSignedIn } from "../reducks/users/selectors";
import './Register.css';

const useStyles = makeStyles({
  guest_login: {
    marginTop:'50px'
  }
})

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const selector = useSelector(state => state);
  //const isSignedIn = getIsSignedIn(selector);
  const [email, setEmail] = useState(""),
        [password, setPassword] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])
  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword])

  const if_username = localStorage.getItem('if-username')

  const inputGuestEmail = useCallback((event) => {
    setEmail(event.target.id)
    console.log(setEmail)
  }, [setEmail, setPassword])
  const inputGuestPassword = useCallback((event) => {
    setPassword(event.target.id)
  }, [setPassword])

    return (
        <>
        {/*
        <div className="center">
              <GreenButton
                label={"ゲストユーザーとしてログイン"}
                onClick={() => {dispatch(push('/signin_asguest'))}}
                className={classes.guest_login}
                />
        </div>
        */}
        <div className="c-section-container_register">
          <div className="Item-Content-Flg1" />
          <div className="Item-Content-Flg2" />
          <p className="center signin-title">ログイン</p>
          <div className="module-spacer--medium" />
          <div className="signin-form__group">
          <TextInput
              fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
              rows={1} value={email} type={"email"} onChange={inputEmail}
          />
          <TextInput
              fullWidth={true} label={"パスワード"} multiline={false} required={true}
              rows={1} value={password} type={"password"} onChange={inputPassword}
          />
          </div>
          <div className="center">
            <PrimaryButton
              label={"ログイン"}
              onClick={() => dispatch(signIn(email, password))}
            />
            <div className="module-spacer--medium" />
            <p onClick={() => {dispatch(push('/signup'))}} className='signup__register-link'>アカウントをお持ちでない方</p>
            <p onClick={() => {dispatch(push('/signin/reset'))}} className='signup__register-link'>パスワードを忘れた方</p>
          </div>
          <div className="module-spacer--small" />
        </div>
        </>
    )
}
export default SignIn;