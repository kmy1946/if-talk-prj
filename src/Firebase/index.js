import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);//react.js内でFirebaseを利用
export const auth = firebase.auth();//in v9 const auth=getAuth();//in oparatios.js onAuthStateChanged(auth, user => {});
export const db = firebase.firestore();
export const where = firebase.firestore();
export const query = firebase.firestore();
export const storage = firebase.storage();
//export const storageRef = firebase.storage().ref();/////////
export const functions = firebase.functions();
export const FirebaseTimestamp = firebase.firestore.Timestamp;