import { makeStyles } from "@material-ui/core";
import React, { useRef, useState } from "react";
import Iframe from 'react-iframe';
import '../Adv.css';
const useStyles = makeStyles({
  adv_iframe: {
  }
});
const AdvDetail = () => {
  const classes = useStyles();
  const link = 'https://firebasestorage.googleapis.com/v0/b/itnotane.appspot.com/o/images%2FHenWUPPtWXqJmr8x?alt=media&token=587b84bb-e301-437b-ac8b-dba61844282b';
  
  return (
    <div className="adv-detail__group">
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
    </div>
  )
}
export default AdvDetail;