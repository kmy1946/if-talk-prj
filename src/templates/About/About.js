import React from "react";
import './About.css';
import { Grid, makeStyles } from "@material-ui/core";
import { OutlinedCard1, OutlinedCard2, OutlinedCard3, OutlinedCard4 } from ".";

const useStyles = makeStyles({
  gridContainer: {
    padding: '16px 20px',
    textAlign:'center'
  }
})

const About = () => {
  const classes = useStyles();
  return (
    <>
    <div className="about__background">
      <div className="about__box">
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <OutlinedCard1 />
          </Grid>
          <Grid item xs={6}>
            <OutlinedCard2 />
          </Grid>
          <Grid item xs={6}>
            <OutlinedCard3 />
          </Grid>
          <Grid item xs={6}>
            <OutlinedCard4 />
          </Grid>
        </Grid>
      </div>
    </div>
    </>
  )
}
export default About;