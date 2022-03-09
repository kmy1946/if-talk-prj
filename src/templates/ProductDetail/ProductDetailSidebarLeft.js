import React from "react";
import List from '@material-ui/core/List';
import TwitterIcon from '@material-ui/icons/Twitter';
import { TableOfContents } from "..";
import { AdvDetail } from "../Adv";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
//import { DetailAdv } from "../Adv";

const ProductDetailSidebarLeft = () => {
  const dispatch = useDispatch();
  return(
    <div>
      <div>
        <List>
          <div className="child2-detail-left__twitter">
            <a onClick={() => dispatch(push('/twitter'))}><TwitterIcon/></a>
        </div>
        </List>
      </div>
    </div>
  )
}
export default ProductDetailSidebarLeft;