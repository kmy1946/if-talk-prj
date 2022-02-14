import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {Badge} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const ProductActionTableFeatured = (props) => {
  return (
          <Badge color="secondary">
            <IconButton onClick={() => props.addProductFeatured()} >
              <AddIcon>
                Feature!!
              </AddIcon>
            </IconButton>
          </Badge>


  )
}
export default ProductActionTableFeatured;