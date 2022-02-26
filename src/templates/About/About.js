import React from "react";
import './About.css';
import { Grid, makeStyles } from "@material-ui/core";
import { OutlinedCard1, OutlinedCard2, OutlinedCard3, OutlinedCard4 } from ".";

const useStyles = makeStyles({
  gridContainer: {
    padding: '16px 20px',
    textAlign:'center'
  },
  about_grid: {
    marginTop:'2vw'
  }
})

const About = () => {
  const classes = useStyles();
  return (
    <>
    <div className="about__background">
      <div className="about__box">
        <Grid container>
          <Grid item xs={6} className={classes.about_grid} >
            <item>
              <OutlinedCard1 />
            </item>
          </Grid>
          <Grid item xs={6} className={classes.about_grid}>
            <item>
              <OutlinedCard2 />
            </item>
            
          </Grid>
          <Grid item xs={6} className={classes.about_grid}>
            <item>
              <OutlinedCard3 />
            </item>
            
          </Grid>
          <Grid item xs={6} className={classes.about_grid}>
            <item>
              <OutlinedCard4 />
            </item>
            
          </Grid>
        </Grid>
      </div>
    </div>
    </>
  )
}
export default About;