import React from "react";
import List from "@material-ui/icons/List";
import { TableOfContents } from "..";

const ProductDetailTOCMobile = () => {
  return (
    <div>
      <ul className="toc__ul__mobile">
        <li className="toc__group__mobile">
          <p className="sidebar__title__detail">目次</p>
          <TableOfContents />
        </li>
      </ul>
    </div>
  )
}
export default ProductDetailTOCMobile;