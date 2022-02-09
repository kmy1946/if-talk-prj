import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {Badge} from "@material-ui/core";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const ProductActionTable = (props) => {
  return (
          <Badge color="secondary">
            <IconButton onClick={() => props.addProduct()} >
              <FavoriteBorder>
                bookmark!!
              </FavoriteBorder>
            </IconButton>
          </Badge>


  )

}
export default ProductActionTable;