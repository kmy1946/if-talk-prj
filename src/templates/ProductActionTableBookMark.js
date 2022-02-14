import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {Badge} from "@material-ui/core";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const ProductActionTableBookMark = (props) => {
  return (
          <Badge color="secondary">
            <IconButton onClick={() => props.addProductBookMark()} >
              <FavoriteBorder>
                bookmark!!
              </FavoriteBorder>
            </IconButton>
          </Badge>


  )

}
export default ProductActionTableBookMark;