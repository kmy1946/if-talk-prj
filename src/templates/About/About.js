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
  },
})

const About = () => {
  const classes = useStyles();
  return (
    <>
    {
      (
      window.innerWidth > 760 ?
        <div className="about__background">
          <div className="about__box">
            <Grid container>
              <Grid item xs={6} className={classes.about_grid} >
                  <OutlinedCard1 />
              </Grid>
              <Grid item xs={6} className={classes.about_grid}>
                  <OutlinedCard2 />
              </Grid>
              <Grid item xs={6} className={classes.about_grid}>
                  <OutlinedCard3 />            
              </Grid>
              <Grid item xs={6} className={classes.about_grid}>
                  <OutlinedCard4 />            
              </Grid>
            </Grid>
          </div>
        </div>
        :
        <Grid container style={{ marginTop:10 ,marginBottom:30, }}>
          <Grid item xs={12} className={classes.about_grid} >
            <OutlinedCard1 />
          </Grid>
          <Grid item xs={12} className={classes.about_grid}>
            <OutlinedCard2 />
          </Grid>
          <Grid item xs={12} className={classes.about_grid}>
            <OutlinedCard3 />            
          </Grid>
          <Grid item xs={12} className={classes.about_grid}>
            <OutlinedCard4 />            
          </Grid>
        </Grid>
        )
      }
    </>
  )
}
export default About;