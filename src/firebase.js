import  firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"




// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyDUFbDngZbDfc2Diid9gFoEPXupJGIgRp4",
  authDomain: "facey-fbfae.firebaseapp.com",
  projectId: "facey-fbfae",
  storageBucket: "facey-fbfae.appspot.com",
  messagingSenderId: "920969323837",
  appId: "1:920969323837:web:750b290e7d179698af9154"
};

firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {firebase, db, auth, storage}