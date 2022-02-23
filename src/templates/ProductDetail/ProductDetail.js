import React from "react";
import './ProductDetail.css'
import { ProductDetailMobile } from '../../templates';
import { ProductDetailPC } from '../../templates';

const ProductDetail = () => {
  return (
    <>
      {
        (
          window.innerWidth > 760 ?
          <>            
            <ProductDetailPC />
          </>
          :
          <>
          <section className="c-section-wrapin">
            <ProductDetailMobile />
          </section>
          </>
        )
      }
    </>
  )

}
export default ProductDetail;