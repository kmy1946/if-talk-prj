import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../reducks/users/operations";
import { getUseId, getUsename } from "../reducks/users/selectors";

const Home = () => {
  const dispatch = useDispatch()
  const selector = useSelector( state => state );
  const uid = getUseId(selector)//store内のusers stateのuidを取得する
  const username = getUsename(selector)

  return (
    <div>
      <h2>Home</h2>
      <p>ID:{ uid }</p>
      <p>NAME:{ username }</p>
      <button onClick={() => {dispatch(signOut())}}>サインアウト</button>
    </div>
  )
}

export default Home;