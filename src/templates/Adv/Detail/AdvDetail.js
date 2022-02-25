import React, { useRef, useState } from "react";
import Iframe from 'react-iframe'
const AdvDetail = () => {
  const googleUrl = "https://www.google.com";
  const link = 'https://firebasestorage.googleapis.com/v0/b/itnotane.appspot.com/o/images%2FHenWUPPtWXqJmr8x?alt=media&token=587b84bb-e301-437b-ac8b-dba61844282b';
  return (
    <>
        <Iframe id = 'adv-detail'
          url = {link}
          //position='absolute'
          width='50%'
          height='20%'
          //onLoad={loaded}
        />
    </>
  )
}
export default AdvDetail;