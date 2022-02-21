import React from "react";
import './ProductDetail.css'
import { ProductDetailMobile } from '../../templates';
import { ProductDetailPC } from '../../templates';
import ProductDetailSidebar from "./ProductDetailSidebar";

const ProductDetail = () => {
  
  return (
    <>
      {
        (
          window.innerWidth > 760 ?
          <>
            <div className="pc-main-detail">
              <section className="c-section-wrapin_detail">
                <ProductDetailPC />
              </section>
              <div className="child2-detail">
                <ProductDetailSidebar />
              </div>
            </div>
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