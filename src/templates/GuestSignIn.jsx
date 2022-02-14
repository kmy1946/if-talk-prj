import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton, GreyButton, GreenButton } from "../components/UIkit";
import { signIn } from "../reducks/users/operations";
import { push } from "connected-react-router";
import { ProductList } from ".";

const SignIn = () => {
  const dispatch = useDispatch()
  
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

  if (if_username) {
    <></>
  } else {
    return (
      <>
        <div className="c-section-container">
          <div className="c-section-container__guest">
            <div className="center">
              <GreenButton
                label={"ログインする"}
                onClick={() => dispatch(signIn('guest@guest.com', 'guestuser'))}
              />
              <p className="guest_signin__p">ゲストユーザーとしてログインできます。</p>
              <div className="module-spacer--medium" />
            </div>
          </div>
        </div>
      </>
    )


  }

}
export default SignIn;