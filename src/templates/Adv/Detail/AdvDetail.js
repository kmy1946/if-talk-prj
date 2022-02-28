import { makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../Firebase";
import '../Adv.css';
const useStyles = makeStyles({
  adv_iframe: {
  }
});
const AdvDetail = () => {
  const classes = useStyles();
  const link = 'https://firebasestorage.googleapis.com/v0/b/itnotane.appspot.com/o/images%2FHenWUPPtWXqJmr8x?alt=media&token=587b84bb-e301-437b-ac8b-dba61844282b';

  const [advDetailData, setAdvDetailData] = useState([])
  const productsRef = db.collection('adv_detail')
  useEffect(() => {
    (async () => {
      await productsRef.orderBy('order', 'desc').limit(2).get()
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
    <div className="adv-detail__group">
      {/*
        <Iframe id = 'adv-detail'
          url = 'https://codeforfun.jp/demo/html/references/tag-iframe.html'
          //position='absolute'
          width='100%'
          height='100%'
          className={classes.adv_iframe}
          display="initial"
          allowFullScreen
          //onLoad={loaded}
        />
      */}
      {advDetailData.length > 0 && (
        advDetailData.map(data => (
              <a href={data.link} target='_blank' key={data.id}>
                <img src={data.image} width='95%' height='95%' className="advdetail__img"/>
              </a>
            )
          )
        )
      }
    </div>
  )
}
export default AdvDetail;