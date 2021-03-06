import { fetchProductsInBookMarkAction, signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import {hideLoadingAction, showLoadingAction} from "../loading/actions";
import { auth, db, FirebaseTimestamp } from "../../Firebase/index";
import { format } from 'date-fns'

export const addProductToBookMark = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const bookmarkRef = db.collection('users').doc(uid).collection('bookmark').doc();//bookmarkサブコレクションを作成、idをbookmarkRef.idで参照可
    addedProduct['bookmarkId'] = bookmarkRef.id;//bookmarkIdをフィールドとして渡す

    await bookmarkRef.set(addedProduct)
    console.log(addedProduct)

    //await bookmarkRef.set(addedProduct)
    //dispatch(push('/'))
  }
};

export const fetchProductsInBookMark = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInBookMarkAction(products))
  }
}

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      if (user) {//認証を完了して存在している状態
        const uid = user.uid

          db.collection("users").doc(uid).get()
            .then(snappshot => {
              const data = snappshot.data()

              //if (!data) {throw new Error('ユーザーデータが存在しません。')}

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username
              }))
            }).catch((error) => console.log(error))
        } else {
        dispatch(push('/signin'))
      }
    })
  }
}

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert('必須項目が未入力です。')
      return false
    } else {
      auth.sendPasswordResetEmail(email)
          .then(() => {
            alert('入力されたメールアドレスにパスワードリセット用のメールをお送りしました。')
            dispatch(push('/signin'))
          }).catch(() => {
            alert('パスワードリセットに失敗しました。')
          })
    }
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // validation
    if (username === "" || email === "" || password === "" || confirmPassword === ""){
      alert("必須項目が未入力です。")
      return false//何も実行しない
    }
    //if(!isValidEmailFormat(email)) {
    //  alert('メールアドレスの形式が不正です。もう1度お試しください。')
    //  return false
    //}
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試しください")
      return false
    }
    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください。')
      return false
    }
    return auth.createUserWithEmailAndPassword(email,password)
      .then(resuult => {
        const user = resuult.user

        if (user) {
          const uid = user.uid;
          //const timestamp = FirebaseTimestamp.now();
          const myShapedDate = format(new Date(), 'yyyyMMddHHmmss');
          const userInitialData = {
            created_at: myShapedDate,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: myShapedDate,
            username: username
          }
          db.collection("users").doc(uid).set(userInitialData)
            .then((res) => {
              localStorage.setItem('if-username', username)
              dispatch(push('/'))//users/'))
              dispatch(hideLoadingAction())
            }).catch((error) => {
              dispatch(hideLoadingAction())
              alert('アカウント登録に失敗しました。もう1度お試しください。')
              throw new Error(error)
          })
        }
      })
  }
}

export const signIn = (email, password) => {
  return async ( dispatch ) => {//dispatch->actionsを呼び出す、getState()->storeの現在のstateを取得する
    //validation
    dispatch(showLoadingAction("Sign in..."));
    if (email === "" || password === ""){
      dispatch(hideLoadingAction());
      alert("必須項目が未入力です。")
      return false
    }
    //if (!isValidEmailFormat(email)) {
    //  dispatch(hideLoadingAction());
    //  alert('メールアドレスの形式が不正です。')
    //  return false
    //}

    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user
        const userState = result.user
        if (!userState) {
          dispatch(hideLoadingAction());
          throw new Error('ユーザーIDを取得できません');
        }
        if (user) {
          const uid = user.uid
          db.collection("users").doc(uid).get()
            .then(snappshot => {
              const data = snappshot.data()
              
              localStorage.setItem('if-username', data.username)
              localStorage.setItem('if-uid', uid)
              //console.log(data.username)
              dispatch(signInAction({
                isSigneIn: true,
                role: data.role,//dataのroleを渡す
                uid: uid,
                username: data.username//dataのusername
              }))
              dispatch(hideLoadingAction());
              dispatch(push('/'))//users/'))
              alert('ログインに成功しました！！')
              //window.location.reload()
          })
        }
      }).catch((error) => {
        dispatch(hideLoadingAction());
        console.log(error)
        alert('ログイン出来ませんでした。もう一度ご確認ください。')
    })
  }
}

export const signOut = () => {
  return async (dispatch, getState) => {
    dispatch(showLoadingAction("Sign Out..."));
    const uid = getState().users.uid

    auth.signOut()
      .then(() => {
        dispatch(signOutAction());//reduxのstoreもSignOut
        dispatch(hideLoadingAction());
        dispatch(push('/'))
        localStorage.removeItem('if_user_id')
        localStorage.removeItem('if_username')
        localStorage.removeItem('if_user_name')
        localStorage.removeItem('if-username')
        localStorage.removeItem('if-uid')
        //window.location.reload()
      }).catch(() => {
          dispatch(hideLoadingAction());
          throw new Error('ログアウトに失敗しました。')
      })
  }
}