import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  contact: {
    textAlign:"center"
  }
})
const Contact = () => {
  const classes = useStyles();
  return (
    <div className={classes.contact}>
      <a href="/contact">
        CONTACT To Manager
      </a>
    </div>
  )
}
export default Contact;