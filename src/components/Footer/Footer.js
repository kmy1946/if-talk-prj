import React from "react";
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container";
import './Footer.css'
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import { FooterArchive, FooterCategory, FooterLeft, FooterLeft2 } from ".";

const Footer = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className='footer_group'>
      <div className='footer__description_box'>
        <p className="footer__description_text">プログラミングの話を分かりやすく解説しています！</p>
      </div>
      <FooterLeft/>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FooterArchive/>
        </Grid>
        <Grid item xs={6}>
          <FooterCategory/>
        </Grid>
      </Grid>
      <Container> 
        <br/>
        <br/>
        <FooterLeft2/>
        <br/>
        <br/>
        <Typography>
        </Typography>
            <Typography className="footer__title">
              {"Copyright © "}
                ITのタネ
              {" "}
              {new Date().getFullYear()}
              {"."}
        </Typography>
      </Container>
    </div>
    </>
  );
}


export default Footer;