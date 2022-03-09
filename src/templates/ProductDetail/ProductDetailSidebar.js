import React from "react";
import List from '@material-ui/core/List';
import { TableOfContents } from "..";
import { AdvDetail } from "../Adv";
//import { DetailAdv } from "../Adv";

const ProductDetailSidebar = () => {
  return(
    <div>
      <div>
        <List className="toc__group" id='toc__group'>
          <p className="sidebar__title__detail">目次</p>
          <TableOfContents />
        </List>
        
        <List className="sidebar__adv-group">
          <AdvDetail/>
        </List>
      </div>
    </div>
  )
}
export default ProductDetailSidebar;