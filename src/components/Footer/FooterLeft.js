import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";

const FooterLeft = () => {
  const dispatch = useDispatch();
  return (
    <div className="footer__totop_box">
      <div className="footer__totop-link_box">
          <a onClick={() => dispatch(push('/'))} className="footer__totop-link">トップページへ</a>
      </div>
      <div className="footer-centering">
            <a onClick={() => dispatch(push('/about'))} className="footer__whensignin-link">当サイトについて</a>
      </div>
      <br/>
      <div className='footer__contact-link_box'>
        <a onClick={() => dispatch(push('/contact'))} className="footer__contact-link">Contact to Manager</a>
      </div>
    </div>
  )
}
export default FooterLeft;