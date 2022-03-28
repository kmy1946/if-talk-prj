import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import Divider from "@material-ui/core/Divider";

const LogoText = () => {
  const dispatch = useDispatch()

  return (
      <div className="logotext" onClick={() => dispatch(push('/'))}>
        <strong>
          ITのタネ
        </strong>
        <br/>
        <br/>
        <p>
          大学生が０から作った技術ブログ
        </p>
        <p>
          プログラミングの話を書いています!!
        </p>
      </div>
  )
}
export default LogoText;