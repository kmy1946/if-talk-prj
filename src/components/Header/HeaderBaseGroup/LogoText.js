import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";

const LogoText = () => {
  const dispatch = useDispatch()

  return (
      <div className="logotext" onClick={() => dispatch(push('/users/'))}>
        <small>
          ITのタネ
        </small>
      </div>
  )
}
export default LogoText;