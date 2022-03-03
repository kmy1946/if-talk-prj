import { makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../Firebase";
import '../Adv.css';
const useStyles = makeStyles({
});
const AdvDetailBottom = () => {
  const [advDetailData, setAdvDetailData] = useState([])
  const productsRef = db.collection('adv_detail_bottom')
  useEffect(() => {
    (async () => {
      await productsRef.orderBy('order', 'desc').limit(1).get()
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
    <div className="adv-detail_bottom__group">
      {advDetailData.length > 0 && (
        advDetailData.map(data => (
            <a href={data.link} target='_blank' key={data.id}>
              <img src={data.image} width='700px' height='auto' alt="" className="advdetail__bottom-img"/>
              <img src={data.image2} border="0" width="1" height="1" alt=""/>
            </a>
            )
          )
        )
      }
    </div>
  )
}
export default AdvDetailBottom;