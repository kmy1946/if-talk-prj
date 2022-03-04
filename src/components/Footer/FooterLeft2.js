import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import TwitterIcon from '@material-ui/icons/Twitter';

const FooterLeft2 = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="footer__twitter">
          <a onClick={() => dispatch(push('/twitter'))}><TwitterIcon/></a>
      </div>
    </div>
  )
}
export default FooterLeft2;