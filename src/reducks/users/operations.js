import { signInAction } from "./actions";
import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "../../Firebase/index";

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      if (user) {//つまりユーザーが認証を完了して存在している状態
        const uid = user.uid

          db.collection("users").doc(uid).get()
            .then(snappshot => {
              const data = snappshot.data()//ＤＢから取得したデータをdataに格納

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,//dataのroleを渡す
                uid: uid,
                username: data.username//dataのusername
              }))

              dispatch(push('/'))
              //ここにwindows.location.reload()を入れると無限ループ
            })
      } else {
        dispatch(push('/'))
      }
    })
  }
}

export const signIn = (email, password) => {
  return async ( dispatch ) => {//dispatch->actionsを呼び出す、getState()->storeの現在のstateを取得する
    //validation
    if (email === "" || password === ""){
      alert("必須項目が未入力です。")
      return false
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user

        if (user) {
          const uid = user.uid
          db.collection("users").doc(uid).get()
            .then(snappshot => {
              const data = snappshot.data()//ＤＢから取得したデータをdataに格納
              dispatch(signInAction({
                isSigneIn: true,
                role: data.role,//dataのroleを渡す
                uid: uid,
                username: data.username//dataのusername
              }))

              dispatch(push('/'))
              alert('ログインに成功しました！！')
            })
        }
      }).catch((error) => {
        console.log(error)
        alert('登録されていないメールアドレスです。もう一度ご確認ください。')
    })
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
          const timestamp = FirebaseTimestamp.now();
          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username
          }
          db.collection("users").doc(uid).set(userInitialData)
            .then(() => {
              dispatch(push('/'))
            }).catch((error) => {
              //dispatch(hideLoadingAction())
              alert('アカウント登録に失敗しました。もう1度お試しください。')
              throw new Error(error)
          })
        }
      })
  }
}