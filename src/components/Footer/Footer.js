import React from "react";
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';
import './Footer.css'
import { Contact } from ".";

const useStyles = makeStyles({

}
);

const Footer = () => {
  const classes = useStyles();
  return (
        <div className='footer_group'>
          <Container>
            <br/>
            <Contact/>
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