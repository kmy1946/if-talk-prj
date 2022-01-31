//actionsの法則
//文字列を変数に格納し、reducersで呼び出し、状態を管理する
//
//
export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type:"SIGN_IN",
    payload: {
      isSignedIn:true,
      uid: userState.uid,
      username: userState.username
    }
  }
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn:false,
      uid:"",
      username:""
    }
  }
}