import React from "react";
import { Divider, IconButton, ListItem, ListItemAvatar, ListItemText, makeStyles } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useSelector } from "react-redux";
import { getUseId } from "../../reducks/users/selectors";
import { db } from "../../Firebase";

const useStyles = makeStyles({
  list:{
    height:120
  },
  image:{
    objectFit:'cover',
    margin:16,
    height:96,
    width:96
  },
  text:{
    width:'100%'
  }
});

const BookMarkListItem = (props) => {
  const classes = useStyles();
  const selector = useSelector((state) => state)
  const uid = getUseId(selector);

  const image = props.product.images[0].path;
  const name = props.product.name;
  const clients = props.product.clients;
  const category = props.product.category;

  const removeProductFromBookMark = (id) => {
    return db.collection('users').doc(uid)
              .collection('bookmark').doc(id)
                .delete()
  }

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="記事画像" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText
            primary={name}
            secondary={"target:"+category}
          />
          <IconButton onClick={() => removeProductFromBookMark(props.product.bookmarkId)}>
            <DeleteForeverIcon />
          </IconButton>
        </div>
      </ListItem>
      <Divider/>
    </>
  )
}
export default BookMarkListItem;