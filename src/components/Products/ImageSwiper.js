import React, { useState } from "react";
import Swiper from "react-id-swiper";
import 'swiper/css/swiper.css';
import NoImage from "../../assets/img/src/no_image.png";

const ImageSwiper = (props) => {
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets:true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
  },
    loop:false,
    spaceBetween: 30,
  })

  const images = props.images
  
  return (
    <>
      {images.length === 0 ? (//画像数0,1,2以上で条件分岐
        <div className="p-media__thumb">
          <img src={NoImage} alt="No Image" className="img_swiper"/>
        </div>
        )
        :
        (
          images.length === 1 ? (
            images.map(image => (
            <div className="p-media__thumb" key={image.id}>
              <img src={image.path} alt="記事画像" className="img_swiper"/>
            </div>
            )
          ))
          :
          <Swiper {...params} >
            {images.map(image => (
              <div className="p-media__thumb" key={image.id}>
                <img src={image.path} alt="記事画像" className="img_swiper"/>
              </div>  
            ))}
          </Swiper>
        )
      }
    </>
  )
}

export default ImageSwiper;