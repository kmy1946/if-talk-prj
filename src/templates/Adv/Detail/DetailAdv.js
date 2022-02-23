import React, { useRef, useState } from "react";
import Iframe from 'react-iframe'
const DetailAdv = () => {
  const googleUrl = "https://www.google.com";
  const link = 'https://firebasestorage.googleapis.com/v0/b/itnotane.appspot.com/o/images%2FHenWUPPtWXqJmr8x?alt=media&token=587b84bb-e301-437b-ac8b-dba61844282b'

  const refBook = useRef(null);
  const refPage = useRef(null);
  const refIframe = useRef(null);
  const [iframSrc, setIframeUrl] = useState(googleUrl);
  const [iframSrcLink, setIframSrcLink] = useState(link)

  const goBook = () => {
    setIframeUrl(
      `${googleUrl}/b=${refBook.current.value}&p=${refPage.current.value}`
    );
  };
  
  
  const loaded = () => {
    const ifrm = document.getElementById('page1').contentWindow;
    ifrm.postMessage({
        userName: 'aaa.bbb',
    }, link);
  }

  return (
    <>
      <div>
        <iframe src={link} width='100vw' height='100%'></iframe>
      </div>
      <div>
        <input type="text" ref={refBook}></input>
        <input type="text" ref={refPage}></input>
        <button type="button" onClick={goBook}>
          Submit
        </button>
        <iframe
          title="myBook"
          src={iframSrc}
          height="720"
          width="1280"
          frameBorder="0"
          scrolling="no"
          allowFullScreen={true}
          ref={refIframe}
        ></iframe>
      </div>
      <div>
        <Iframe id = 'page1'
          url = {link}
          position='absolute'
          width='50%'
          height='20%'
          onLoad={loaded}
        />
      </div>
    </>
  )
}
export default DetailAdv;