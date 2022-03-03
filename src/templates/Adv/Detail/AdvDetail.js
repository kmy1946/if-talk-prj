import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../../../Firebase";
import '../Adv.css';
const useStyles = makeStyles({
});
const AdvDetail = () => {
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
      <p>スポンサーリンク</p>
      {advDetailData.length > 0 && (
        advDetailData.map(data => (
              <a href={data.link} target='_blank' key={data.id}>
                <img src={data.image} width='95%' height='95%' border="0" alt="" className="advdetail__img"/>
                <img src={data.image2} border="0" width="1" height="1" alt=""/>
              </a>
            )
          )
        )
      }
    </div>
  )
}
export default AdvDetail;