import React, { useEffect, useState } from "react";
import { db } from "../../../Firebase";
const AdvTopRight = () => {
  const [advDetailData, setAdvDetailData] = useState([]);
  let id = 'hnmCOzpT91hOdVrf0Tcg';

  useEffect(() => {
    (async () => {
      await db.collection('adv_top_sidebar').doc(id).collection('right').orderBy('order', 'desc').get()
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
    <div className="adv-top-right__group">
      {advDetailData.length > 0 && (
        advDetailData.map(data => (
              <a href={data.link} target='_blank' key={data.id}>
                <img src={data.image} width='95%' height='95%' border="0" alt="" className="adv-top-right__img"/>
                <img src={data.image2} border="0" width="1" height="1" alt=""/>
              </a>
            )
          )
        )
      }
    </div>
  )
}
export default AdvTopRight;