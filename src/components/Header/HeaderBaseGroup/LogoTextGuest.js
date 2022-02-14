import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";

const LogoTextGuest = () => {
  const dispatch = useDispatch()

  return (
      <div className="logotext" onClick={() => dispatch(push('/guest'))}>
        <small>
          IF-Programmer
        </small>
      </div>
  )
}
export default LogoTextGuest;