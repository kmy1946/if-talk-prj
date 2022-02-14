import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  "button": {
    backgroundColor: "#5ff07e",
    color: "#000",
    height: 48,
    marginBottom: 16,
    width: 256
  }
})
const GreenButton = (props) => {
  const classes = useStyles();
  return (
    <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  )
}
export default GreenButton;