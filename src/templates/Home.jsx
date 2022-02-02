import React from "react";
import { useSelector } from "react-redux";
import { getUseId, getUsename } from "../reducks/users/selectors";

const Home = () => {
  const selector = useSelector( state => state );
  const uid = getUseId(selector)//store内のusers stateのuidを取得する
  const username = getUsename(selector)

  return (
    <div>
      <h2>Home</h2>
      <p>ID:{ uid }</p>
      <p>NAME:{ username }</p>
    </div>
  )
}

export default Home;