import { makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles({
  aboveheader:{
    backgroundColor:'grey',
    flexGrow: 1,
    marginTop:'70px'
  }
});
const AboveHeader = () => {
  const classes = useStyles();
  return (
    <>
    <div className={classes.aboveheader}>
      <p>
        component
      </p>
    </div>
    </>
  )
}
export default AboveHeader;