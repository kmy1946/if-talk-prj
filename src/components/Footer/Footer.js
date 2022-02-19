import React from "react";
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer_group'>
      <Container>
        <div className="footer-centering">
          <a href="/whensignin" className="footer__whensignin-link">ユーザー登録について</a>
        </div>
        <br/>
        <div className='footer__contact_link_box'>
          <a href='/contact' className="footer__contact_link">Contact to Manager</a>
        </div>
        <br/>
        <Typography>
        </Typography>
            <Typography className="footer__title">
              {"Copyright © "}
                IF-Programmer
              {" "}
              {new Date().getFullYear()}
              {"."}
          </Typography>
          </Container>
    </div>
  );
}


export default Footer;