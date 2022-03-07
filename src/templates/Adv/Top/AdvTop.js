import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../Firebase";
import '../Adv.css';
const useStyles = makeStyles({});
const AdvTop = () => {
  const classes = useStyles();

  const [advDetailData, setAdvDetailData] = useState([])
  
  useEffect(() => {
    (async () => {
      await db.collection('adv_top').orderBy('order', 'asc').get()
        .then(snapshots => {
          let results = []
          snapshots.forEach(snapshots => {
            results.push({ ...snapshots.data()})
          })
          setAdvDetailData(results)
        })
        .catch((error) => console.log(error))
      })()
    },[])
  
  return (
    <div className="adv-top__group">
      <Grid container className="about__grid">
        {advDetailData.length > 0 && (
          advDetailData.map(data => (
              <Grid item xs={6} key={data.id}>
                <a href={data.link} target='_blank' rel="nofollow">
                  <img src={data.image} width='96%' height='96%' border="0" alt="" className="advtop__img"/>
                  <img src={data.image2} border="0" width="1" height="1" alt=""/>
                </a>
              </Grid>
              )
            )
          )
        }
      </Grid>
    </div>
  )
}
export default AdvTop;