// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import getFirestore from "firebase/firestore";

import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCYktca6OwYUX7CfRanFSs6wPU7C0T5vQ",
  authDomain: "react-manga-world.firebaseapp.com",
  databaseURL: "https://react-manga-world-default-rtdb.firebaseio.com",
  projectId: "react-manga-world",
  storageBucket: "react-manga-world.appspot.com",
  messagingSenderId: "271525478566",
  appId: "1:271525478566:web:428cf553d373d58b91b467",
  measurementId: "G-FW7W3PWCWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth()
const provider = new GoogleAuthProvider()
export const login = (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password)
}

export const singUp = (email, password) =>{
    return createUserWithEmailAndPassword(auth, email, password)
}

export const logout = () =>{ 
    return signOut(auth)
}
// user: login password name age