// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import {getAuth, PhoneAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2CmKtovnTPESUXd57PWyW6_ho3S286e8",
  authDomain: "talk2me-3c28f.firebaseapp.com",
  projectId: "talk2me-3c28f",
  storageBucket: "talk2me-3c28f.appspot.com",
  messagingSenderId: "1033793611847",
  appId: "1:1033793611847:web:320ffb7082cf79a0c16962",
  measurementId: "G-LTSP4CCCZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const phoneProvider = new PhoneAuthProvider();