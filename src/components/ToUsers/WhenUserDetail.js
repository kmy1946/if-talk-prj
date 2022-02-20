import React from 'react';
import { UserDetail, UserDetailMobile } from '.';
import './WhenUserDetail.css'
const WhenUserDetail = () => {
  return (
    <>
    {
      (
        window.innerWidth > 760 ?
        <UserDetail/>
        :
        <UserDetailMobile/>
      )
    }
    </>
  )
}
export default WhenUserDetail;