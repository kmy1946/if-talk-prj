import React from "react";
import { makeStyles } from "@material-ui/core";
import List from '@material-ui/core/List';
import { TableOfContents } from "..";

const ProductDetailSidebar = () => {
  return(
    <div>
      <div>
        <List  className="toc__group">
          <p className="sidebar__title__detail">目次</p>
          <TableOfContents />
        </List>
      </div>
    </div>
  )
}
export default ProductDetailSidebar;