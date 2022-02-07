import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Table } from "@material-ui/core";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import {Badge} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { ImageSwiper } from "../components/Products";
import { db, FirebaseTimestamp } from "../Firebase";
import { returnCodeToBr } from "../function/common";
import { addProductToBookMark } from "../reducks/users/operations";

const ProductActionTable = (props) => {
  
  return (
                        <Badge color="secondary">
                        <IconButton onClick={() => props.addProduct()} >
                          <AddIcon>
                          bookmark!!
                          </AddIcon>
                        </IconButton>
                        </Badge>


  )

}
export default ProductActionTable;