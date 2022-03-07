import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../../../Firebase";
import '../Adv.css';

const AdvDetailBottom = () => {
  const [advDetailBottomData, setAdvDetailBottomData] = useState([]);
  let id = window.location.pathname.split('/product')[1];

  useEffect(() => {
    if (id === undefined) {//新規作成時UncaughtError回避
      id = ""
    }
    if (id !== "") {
        id = id.split('/')[1]//productのidを取得
    }
    
    (async () => {
      await db.collection("adv_detail_bottom").doc(id).collection('advertizement').orderBy('order', 'asc').get()
        .then(snapshots => {
          let results = []
          snapshots.forEach(snapshots => {
            results.push({ ...snapshots.data()})
          })
          //console.log(results)
          setAdvDetailBottomData(results)
        })
        .catch((error) => console.log(error))
      })()
    },[])

  return (
    <div className="adv-detail_bottom__group">
      <Grid container className="about__grid">
        {advDetailBottomData.length > 0 && (
          advDetailBottomData.map(data => (
              <Grid item xs={6} key={data.id}>
                <a href={data.link} target='_blank' key={data.id}>
                  <img src={data.image} width='99%' height='auto' alt="" className="advdetail__bottom-img"/>
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
export default AdvDetailBottom;