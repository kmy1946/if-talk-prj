import React from "react";
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';
import './Footer.css'

const useStyles = makeStyles({
  contact_link_box: {
    textAlign:'center',
    fontFamily:'cursive',
  }
}
);

const Footer = () => {
  const classes = useStyles();
  return (
        <div className='footer_group'>
          <Container>
            <br/>
            <div className={classes.contact_link_box}>
              <a href='/contact'>Contact to Manager</a>
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