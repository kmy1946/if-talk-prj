import React from "react";
import List from '@material-ui/core/List';
import { TableOfContents } from "..";
//import { DetailAdv } from "../Adv";

const ProductDetailSidebar = () => {
  return(
    <div>
      <div>
        <List className="toc__group">
          <p className="sidebar__title__detail">目次</p>
          <TableOfContents />
        </List>
      </div>
      {/*
      <div>
        <List className="detailadv__group">
          <DetailAdv />
        </List>
      </div>
      */}
    </div>
  )
}
export default ProductDetailSidebar;