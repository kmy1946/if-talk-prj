import { Grid } from "@material-ui/core";
import { push } from "connected-react-router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const FooterArchive = () => {
  const dispatch = useDispatch();
  const selectMenu = (event, path) => {
    dispatch(push(path));//pathはvalueで指定
  };
  const [filters, setFilters] = useState([
    {func: selectMenu, label: "2022.1", id: "2022_1_month", value: "/?created_at_month=202201"},
    {func: selectMenu, label: "2022.2", id: "2022_2_month", value: "/?created_at_month=202202"},
    {func: selectMenu, label: "2022.3", id: "2022_3_month", value: "/?created_at_month=202203"},
  ]);

  return (
    <>
    <Grid container>
        <Grid item xs={12}>
          <div className="menu">
            <label htmlFor="Panel1_arc">アーカイブ</label>
            <input type="checkbox" id="Panel1_arc" className="on-off" />
            <ul>
              {filters.map(filter => (
                <li key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                    {filter.label}
                </li>
              ))}
            </ul>
          </div>
        </Grid>
      </Grid>
    </>
  )
}
export default FooterArchive;