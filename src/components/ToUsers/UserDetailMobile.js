import React from "react";
const UserDetailMobile = () => {
  return (
    <>
      <div className='center'>
        <div className='whenuserdetail_mobile'>
          <p className='whenuserdetail_title'>ユーザー登録でできる事</p>
          <ul className="cp_list">
            <li>記事投稿・編集・削除</li>
            <div className='cp_list__description'>
              <p>
                　エディタの実装にはDraft.jsを採用させていただきました。
              </p>
            </div>
            <li>記事のお気に入り登録</li>
            <div className='cp_list__description'>
              <p>
                　登録した記事を一覧表示します。
              </p>
            </div>
          </ul>
          <div className="module-spacer--small" />
          <a href='/signin' className='whenuserdetail__register_link'>※ ログイン画面へ</a>
          <br/><br/>
          <a href='/signup' className='whenuserdetail__register_link'>※ ユーザー登録画面へ</a>
        </div>
      </div>
    </>
  )
}
export default UserDetailMobile;