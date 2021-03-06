import React from "react";
import { InputLabel } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  FormControl: {
    marginBottom: 16,
    minWidth: 128,
    width:"20%"
  }
});

const SelectBox = (props) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.FormControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required} value={props.value}
        onChange={(event) => props.select(event.target.value)}
      >
        {props.options.map((options) => (
          <MenuItem key={options.id} value={options.name}>{options.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default SelectBox;